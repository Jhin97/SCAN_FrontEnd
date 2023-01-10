<template>
    <el-row>
        <el-col :span="6">
            <p>Child options expand when clicked (default)</p>
            <el-cascader v-model="value" :options="options" @change="handleChange" :props="props" />
        </el-col>
        <el-col :span="18">
            <el-descriptions title="Dataset information" direction="vertical" :column="4" border>
                <el-descriptions-item label="Title">{{ descriptions.title }}</el-descriptions-item>
                <el-descriptions-item label="Journal">{{ descriptions.journal }}</el-descriptions-item>
                <el-descriptions-item label="Institution">{{ descriptions.institution }}</el-descriptions-item>
                <el-descriptions-item label="Reference">{{ descriptions.reference }}</el-descriptions-item>
                <el-descriptions-item label="Tech">{{ descriptions.tech }}</el-descriptions-item>
                <el-descriptions-item label="Cell Number">{{ descriptions.cellNumber }}</el-descriptions-item>
                <el-descriptions-item label="Data Source">{{ descriptions.dataSource }}</el-descriptions-item>
            </el-descriptions>
        </el-col>
    </el-row>
</template>


<script setup>
import { onMounted, ref, reactive } from 'vue';
import { apiGetCascadeOptionsForNeuralTree, apiGetTableData } from '@/api';

//描述内容
const descriptions = reactive({
})

// const test = ref("")

//第一级的下拉框
const options = reactive([])

//动态加载二三级的选项
const props = {
    lazy: true,
    lazyLoad(node, resolve) {
        const { level } = node
        apiGetCascadeOptionsForNeuralTree(JSON.stringify({
            currentLevel: level,
            selectedNode: node.label
        })).then((res) => {
            const nodes = res.data.data.map(i => {
                return {
                    value: i.value,
                    label: i.label,
                    leaf: level >= 2
                }
            })
            resolve(nodes)
        }).catch((error) => {
            alert("loading options error!")
        })

    }

}

//点击事件选中结果
const value = ref([])

//加载第一级的下拉框值
const loadOptions = () => {
    apiGetCascadeOptionsForNeuralTree(JSON.stringify({
        currentLevel: "0",
        selectedNode: "classification"
    })).then((res) => {
        options.push(...res.data.data)
    }).catch((error) => {
        alert("loading options error!")
    })
}

//
const loadDescriptions = (value) => {
    apiGetTableData(JSON.stringify({
        entityType: "neuralPan",
        searchFields: { scan_pan_id: value },
        pagination: {
            pageNum: 1,
            pageSize: 1
        }
    }
    )).then((res) => {
        if (!res || res.status != 200 || !res.data || res.data.code != 200 || !res.data.data) {
            if (res.data.msg) {
                alert(res.data.msg)
            } else {
                alert("加载异常!")
            }
            return;
        }

        for (const key in res.data.data.data[0]) {
            descriptions[key] = res.data.data.data[0][key];
        }


    }).catch((error) => {
        alert("加载异常!")
    })
}


const handleChange = (value) => {
    const selectedValue = value[2]
    loadDescriptions(selectedValue)

}

onMounted(() => {
    loadOptions()
    loadDescriptions("SCAN_Pan_0001")
})
</script>

<style scoped>
.el-button {
    display: none;
}
</style>
