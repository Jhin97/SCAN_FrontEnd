<template>
	<div class="content">
		<el-card class="search-box">
			<div class="table-btn-box flex">
				<div class="flex">
					<div class="search-label">快捷搜索: </div>
					<el-form :inline="true" :model="searchForm" class="search-form">
						<el-form-item class="type-select">
							<el-select v-model="searchForm.type" placeholder="快捷搜索" @change="searchTypeChange">
								<template v-for="(item, index) in entityFields">
									<el-option v-if="item.defaultSearch" :label="item.label" :value="item.prop">
									</el-option>
								</template>
							</el-select>
						</el-form-item>
						<el-form-item>
							<template v-if="(currentSearchField.type == '1')">
								<el-input v-model="searchForm.value"
									:placeholder="(('请输入') + currentSearchField.label)" />
							</template>
							<template v-else-if="(currentSearchField.type == '2')">
								<el-input v-model="searchForm.value"
									:placeholder="(('请输入') + currentSearchField.label)" />
							</template>
							<template v-else-if="currentSearchField.type == '3'">
								<el-select v-model="searchForm.value" :placeholder="'请选择' + currentSearchField.label"
									class="value-filed">
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
								<!-- <el-button type="primary" @click="filterData" icon="Filter">Filter</el-button> -->
							</el-button-group>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<el-divider />
			<div class="search-tag">
				<span class="search-label">当前筛选: </span>
				<el-tag class="mx-1" size="small" closable>名称: XXX</el-tag>
			</div>
			<!-- 高级筛选表单 -->
			<div class="search-filter-box">
				<el-divider />
				<el-form label-width="100px" :model="filterForm" class="search-filter-form">
					<div class="search-filter-form-container">
						<template v-if="filterForm" v-for="(item, index) in entityFields">
							<template v-if="item.defaultSearch">
								<div class="search-filter-form-item"
									v-if="item.type == '1' || item.type == '2'">
									<el-form-item :label="item.label + ': '">
										<el-input :v-model="filterForm[item.prop]" :placeholder="'请输入' + item.label" />
									</el-form-item>
								</div>
								<div class="search-filter-form-item" v-else-if="item.type == '3'">
									<el-form-item :label="item.label + ': '">
										<el-select :v-model="filterForm[item.prop]" :placeholder="'请选择' + item.label"
											class="value-filed">
											<template v-for="(item, index) in item.dicts" :key="item.value">
												<el-option :label="item.label" :value="item.value" />
											</template>
										</el-select>
									</el-form-item>
								</div>
							</template>
						</template>
					</div>
					<div class="search-filter-form-buttons">
						<el-button-group>
							<el-button type="primary" @click="onSubmit">Query</el-button>
							<el-button type="primary" @click="onSubmit">Query</el-button>
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
							<el-table-column :prop="item.prop" :label="item.label"></el-table-column>
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
import axios from 'axios';
import { useStore } from "vuex";


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

const option = defineProps({
	//实体的类型
	entityType: {
		type: String,
		required: true
	},
	//表格数据源
	dataSource: {
		type: String,
		required: true
	},
})

const entityFields = reactive([]);

//快捷搜索栏
const searchForm = reactive({
	type: "",
	value: ""
});

//复杂搜索栏
const filterForm = reactive({})

//当前搜索字段
const currentSearchField = reactive({});

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

	//获取搜索参数
	let entity = {};
	if (searchForm.type && searchForm.value) {
		entity[searchForm.type] = searchForm.value;
	}
	axios.post(option.dataSource, JSON.stringify({
		entity: entity,
		pagination: {
			pageNum: paginationInfo.pageNum,
			pageSize: paginationInfo.pageSize
		}
	}
	)).then((res) => {
		console.log(res)
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
		paginationInfo.pageNum = res.data.data.pageNumber;
		paginationInfo.totalData = res.data.data.recordsTotal;

	}).catch((error) => {
		tableLoading.value = false;
		alert("加载异常!")
	})
}


//加载关联数据字典选项
const loadFieldDictByKey = (prop, key) => {
	//先从vuex缓存读取，若无则访问后台获取
	let cacheData = store.getters.listDictByKey;

	if (cacheData && cacheData[key]) {
		entityFields.forEach((item, index) => {
			if (item.prop == prop) {
				entityFields[index].dicts = store.getters.listDictByKey[key]
			}
		})
		return;
	}

	axios.post("http://localhost:8080/vue/loadFieldDictByKey", JSON.stringify({ key: key })).then((res) => {
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
		store.commit("setDict", key, res.data.data)
	}).catch((error) => {
		alert("加载异常!")
	})

};

onMounted(() => {
	// loadData
	axios.post("/api/panEntityFields", JSON.stringify({ tableTag: option.entityType })).then((res) => {
		// console.log(res)
		if (!res || res.status != 200 || !res.data || res.data.code != 200 || !res.data.data) {
			if (res.data.msg) {
				alert(res.data.msg)
			} else {
				alert("加载异常!")
			}
			return;
		}
		entityFields.splice(0, entityFields.length);
		entityFields.push(...res.data.data)


		//默认选中第一个可筛选字段
		let firstSearchItem = null;

		for (let key in filterForm) {
			delete filterForm[key]
		}

		entityFields.forEach((item, index) => {
			if (item.defaultSearch) {
				filterForm[item.prop] = "";
			}
			if (item.defaultSearch && item.type == "4") {
				entityFields[index].dicts = [];
				loadFieldDictByKey(item.prop, item.key);
			}

			if (!firstSearchItem && item.defaultSearch) {
				firstSearchItem = item;
			}
		})

		if (firstSearchItem) {
			searchTypeChange(firstSearchItem.prop)
			searchForm.type = firstSearchItem.prop
		}
		//初始化加载数据
		loadData();
	}).catch((error) => {
		alert("加载异常!")
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
	margin-right: 10px;
}

.search-box:deep(.type-select) {
	width: 120px;
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
.search-filter-form-buttons{
	text-align: center;
}
</style>