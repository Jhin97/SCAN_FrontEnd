<template>
	<div class="content">
		<el-card class="search-box">
			<div class="table-btn-box flex">
				<div class="flex">
					<div class="search-label">Quick Search: </div>
					<el-form :inline="true" :model="searchForm" class="search-form" :disabled="searchFormDisabled">
						<el-form-item class="type-select">
							<el-select v-model="searchForm.type" placeholder="Quick Search" @change="searchTypeChange">
								<template v-for="(item, index) in entityFields">
									<el-option v-if="item.defaultSearch" :label="item.label" :value="item.prop">
									</el-option>
								</template>
							</el-select>
						</el-form-item>
						<!-- 1:输入数字/文字 2:下拉框 3:链接 4:斜体字 -->
						<el-form-item>
							<template v-if="(currentSearchField.type == '1')">
								<el-input v-model="searchForm.value"
									:placeholder="(('Please Input ') + currentSearchField.label)" />
							</template>
							<template v-else-if="currentSearchField.type == '2'">
								<el-select v-model="searchForm.value"
									:placeholder="'Please Select' + currentSearchField.label" class="value-filed">
									<template v-for="(item, index) in currentSearchField.dicts" :key="item.value">
										<el-option :label="item.label" :value="item.value" />
									</template>
								</el-select>
							</template>
						</el-form-item>
						<el-form-item>
							<el-button-group>
								<el-button type="primary" @click="searchData" icon="Search">Search</el-button>
								<el-button type="primary" @click="refreshData" icon="Refresh">Refresh</el-button>
								<el-button type="primary" @click="showSearchFilterBox" icon="Filter">Filter</el-button>
							</el-button-group>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<el-divider />
			<div class="search-tag">
				<span class="search-label">Current Filter: </span>
				<span v-if="JSON.stringify(currentSearchParam) == '{}'" class="search-item-empty">None</span>
				<template v-else v-for="(item, index) in currentSearchParam" :key="index">
					<el-tag class="search-item" size="small" closable @close="removeSearchItem(index)">
						{{ getLabelByProp(index) }}:{{ item }}
					</el-tag>
				</template>
			</div>
			<!-- 高级筛选表单 -->
			<div class="search-filter-box" v-if="searchFilterBox">
				<el-divider />
				<el-form label-width="100px" :model="filterForm" class="search-filter-form">
					<div class="search-filter-form-container">
						<template v-if="filterForm" v-for="(item, index) in entityFields" :key="item.prop">
							<template v-if="item.defaultSearch">
								<div class="search-filter-form-item" v-if="item.type == '1'">
									<el-form-item :label="item.label + ': '" :prop="item.prop">
										<el-input v-model="filterForm[item.prop]" :placeholder="'请输入' + item.label" />
									</el-form-item>
								</div>
								<div class="search-filter-form-item" v-else-if="item.type == '2'">
									<el-form-item :label="item.label + ': '" :prop="item.prop">
										<el-select v-model="filterForm[item.prop]" :placeholder="'请选择' + item.label"
											class="value-filed">
											<template v-for="(dictItem, dictIndex) in item.dicts" :key="item.value">
												<el-option :label="dictItem.label" :value="dictItem.value" />
											</template>
										</el-select>
									</el-form-item>
								</div>
							</template>
						</template>
					</div>
					<div class="search-filter-form-buttons">
						<el-button-group>
							<el-button type="primary" @click="hideSearchFilterBox = false">Cancel</el-button>
							<el-button type="primary" @click="onFilterFormSubmit">Query</el-button>
						</el-button-group>
					</div>
				</el-form>
			</div>
			<el-divider />
		</el-card>

		<el-card class="table-box">
			<!-- <div class="tools-bar flex">
				<div class="flex-item">
					<el-button-group>
						<el-button size="small">数据导出</el-button>
						<el-button size="small">数据导出</el-button>
					</el-button-group>
					<slot name="tool-btns"></slot>
				</div>
				<div class="">
					<el-button-group>
						<el-button size="small" type="primary" icon="Setting">设置</el-button>
					</el-button-group>
				</div>
			</div> -->
			<div class="table-content">
				<el-table ref="table" :data="tableData" border stripe :height="tableHeight" style="width: 100%"
					v-loading="tableLoading">
					<template v-for="(item, index) in entityFields" :key="item.prop">
						<template v-if="item.show">
							<!-- 1:输入数字/文字 2:下拉框 3:链接 4:斜体字 -->
							<template v-if="item.type == '1' || item.type == '2'">
								<el-table-column :prop="item.prop" :label="item.label"></el-table-column>
							</template>
							<template v-else-if="item.type == '3'">
								<el-table-column :prop="item.prop" :label="item.label">
									<template #default="scope">
										<a :href="scope.row[item.prop]" target="_blank"><el-icon><Link /></el-icon>Link</a>
									</template>
								</el-table-column>
							</template>
							<template v-else-if="item.type == '4'">
								<el-table-column :prop="item.prop" :label="item.label">
									<template #default="scope">
										<div class="latin-name">{{ scope.row[item.prop] }}</div>
									</template>
								</el-table-column></template>
						</template>
					</template>
				</el-table>
			</div>
			<div class="table-page">
				<el-pagination v-model:current-page="paginationInfo.pageNum" v-model:page-size="paginationInfo.pageSize"
					:page-sizes="[10, 20, 30]" background layout="total, sizes, prev, pager, next, jumper"
					:total="paginationInfo.totalData" @size-change="handleSizeChange"
					@current-change="handleCurrentChange" />
			</div>
		</el-card>
	</div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useStore } from "vuex";
import { apiGetEntityFields, apiGetDictByKeys, apiGetTableData } from '@/api';


let store = useStore();

const table = ref(null);

//表格分页信息
const paginationInfo = reactive({
	pageNum: 1,
	pageSize: 10,
	totalData: 0
})

//分页事件监听
const handleSizeChange = (pageSize) => {
	paginationInfo.pageSize = pageSize;
	loadData();
}
const handleCurrentChange = (pageNum) => {
	paginationInfo.pageNum = pageNum;
	loadData();
}

//刷新表格
const refreshData = () => {
	loadData();
}
//表格搜索
const searchData = () => {
	paginationInfo.pageNum = 1;
	paginationInfo.totalData = 0;
	loadData();
}

//父组件传值
const option = defineProps({
	//实体的类型
	entityType: {
		type: String,
		required: true
	},
	//打开后自带的单个查询
	simpleSearchTarget: {
		type: Object,
		required: false
	},
})

//表格字段动态获取
const entityFields = reactive([]);

//快捷搜索栏
const searchForm = reactive({
	type: "",
	value: ""
});

//根据字段名获取对应的显示名
const getLabelByProp = (prop) => {
	for (let i = 0; i < entityFields.length; i++) {
		if (entityFields[i].prop == prop) {
			return entityFields[i].label;
		}
	}
	return "";
}

//移除筛选项
const removeSearchItem = (prop) => {
	delete [prop];
	if (searchForm.type == prop) {
		searchForm.value = "";
	}
	filterForm[prop] = "";
	onFilterFormSubmit();
}

//快捷搜索栏禁用状态
const searchFormDisabled = ref(false)

//复杂搜索栏
const filterForm = reactive({});

//复杂搜索框打开状态
const searchFilterBox = ref(false);

//复杂搜索表单递交
const onFilterFormSubmit = () => {
	paginationInfo.pageNum = 1;
	paginationInfo.totalData = 0;
	loadData();
}

//展示复杂搜索栏
const showSearchFilterBox = () => {
	//若简单搜索存在，则给高级筛选初始值
	if (!searchFilterBox.value) {
		filterForm[searchForm.type] = searchForm.value;
		searchFilterBox.value = true;
	} else {
		searchFilterBox.value = false;
	}
}

//关闭复杂搜索栏
const hideSearchFilterBox = () => {
	searchFilterBox.value = false;
}

//当前搜索字段
const currentSearchField = reactive({});

//当前搜索的对象
const currentSearchParam = reactive({});

const searchTypeChange = (value) => {
	for (let key in currentSearchField) {
		delete currentSearchField[key];
	}
	entityFields.forEach((item, index) => {
		if (value == item.prop) {
			for (let key in item) {
				currentSearchField[key] = item[key];
			}
		}
	})
	searchForm.value = '';
}

const tableHeight = ref('400px');

const tableData = reactive([]);

//表格加载状态
const tableLoading = ref(false);


const loadData = () => {
	tableLoading.value = true;


	if (searchFilterBox.value) { //2.高级筛选弹出的时候取高级筛选的参数
		for (let key in currentSearchParam) {
			delete currentSearchParam[key];
		}
		for (let key in filterForm) {
			if (filterForm[key]) {
				currentSearchParam[key] = filterForm[key];
			}
		}

		if (currentSearchParam[searchForm.type]) {
			searchForm.value = currentSearchParam[searchForm.type];
		}
	} else { //1.高级筛选没有的弹出的时候取快捷筛选
		if (searchForm.value) {
			currentSearchParam[searchForm.type] = searchForm.value;
		} else {
			delete currentSearchParam[searchForm.type];
		}
	}

	apiGetTableData(JSON.stringify({
		entityType: option.entityType,
		searchFields: currentSearchParam,
		pagination: {
			pageNum: paginationInfo.pageNum,
			pageSize: paginationInfo.pageSize
		}
	}
	)).then((res) => {
		tableLoading.value = false;
		if (!res || res.status != 200 || !res.data || res.data.code != 200 || !res.data.data) {
			if (res.data.msg) {
				alert(res.data.msg)
			} else {
				alert("加载异常!")
			}
			return;
		}
		tableData.splice(0, tableData.length);
		if (res.data.data.data) {
			tableData.push(...res.data.data.data)
		}
		paginationInfo.pageNum = res.data.data.pageNum;
		paginationInfo.totalData = res.data.data.totalData;

	}).catch((error) => {
		tableLoading.value = false;
		alert("加载异常!")
	})
}


//加载关联数据字典选项
const loadFieldDictByKey = (prop) => {
	//先从vuex缓存读取，若无则访问后台获取
	let cacheData = store.getters.listDictByKey;

	if (cacheData && cacheData[prop]) {
		entityFields.forEach((item, index) => {
			if (item.prop == prop) {
				entityFields[index].dicts = store.getters.listDictByKey[prop]
			}
		})
		return;
	}

	apiGetDictByKeys(JSON.stringify({
		entityType: option.entityType,
		targetColumn: prop
	})).then((res) => {

		if (!res || res.status != 200 || !res.data || res.data.code != 200 || !res.data.data) {
			if (res.data.msg) {
				alert(res.data.msg)
			} else {
				alert("加载异常!")
			}
			return;
		}

		entityFields.forEach((item, index) => {
			if (item.prop == prop) {
				entityFields[index].dicts = res.data.data
			}
		})
		store.commit("setDict", prop, res.data.data)
	}).catch((error) => {
		alert("加载异常!")
	})

};


onMounted(() => {
	// loadData
	apiGetEntityFields(JSON.stringify({
		entityType: option.entityType

	})).then((res) => {
		if (!res || res.status != 200 || !res.data || res.data.code != 200 || !res.data.data) {
			if (res.data.msg) {
				alert(res.data.msg)
			} else {
				alert("加载异常! apiGetEntityFields")
			}
			return;
		}
		entityFields.splice(0, entityFields.length);
		entityFields.push(...res.data.data)


		//默认选中第一个可筛选字段
		let firstSearchItem = null;

		for (let ley in filterForm) {
			delete filterForm[key];
		}


		entityFields.forEach((item, index) => {
			if (item.defaultSearch) {
				filterForm[item.prop] = "";
			}
			if (item.defaultSearch && item.type == "2") {
				entityFields[index].dicts = [];
				loadFieldDictByKey(item.prop);
			}

			if (!firstSearchItem && item.defaultSearch) {
				firstSearchItem = item;
			}
		})

		if (firstSearchItem) {
			searchTypeChange(firstSearchItem.prop)
			searchForm.type = firstSearchItem.prop
		}
		//判断带不带查询指令，然后初始化加载数据
		if (typeof (option.simpleSearchTarget) == "undefined") {
			loadData();
		} else {
			searchForm.type = Object.keys(option.simpleSearchTarget)[0]
			searchForm.value = Object.values(option.simpleSearchTarget)[0]
			searchFormDisabled.value = true
			loadData()
		}
	}).catch((error) => {
		alert("加载异常! loaddata")
	})
})




</script>

<style scoped>
.content {
	padding: 0 10px;
	margin-top: 10px;
	background: var(--el-bg-color);
}

.content:deep(.el-divider--horizontal) {
	margin: 0px 0;
}

.table-page {
	padding-top: 10px;
}

.table-btn-box {
	padding: 10px 0;
}

.tools-bar {
	padding: 5px 0px;
}

.search-tag {
	padding: 5px 0px;
}

.search-label {
	font-size: 14px;
	line-height: 32px;
	margin-right: 5px;
}

.search-box:deep(.el-form-item) {
	margin-bottom: 0px;
	margin-right: 5px;
}

.search-box:deep(.type-select) {
	width: 200px;
}

.table-box {
	margin-top: 10px;
}

.content:deep(.el-card__body) {
	--el-card-padding: 10px
}

.search-filter-box {
	margin-bottom: 10px;
}

.search-filter-form {
	margin-top: 10px;
}

.search-filter-form-container {
	display: flex;
	flex-wrap: wrap;
}

.search-filter-form-container .search-filter-form-item {
	width: 45%;
	margin-bottom: 10px;
}

.search-filter-form-container .search-filter-form-item:deep(.el-input) {
	width: 220px;
}

.search-filter-form-buttons {
	text-align: center;
}

.latin-name {
	font-style: italic;

}
</style>