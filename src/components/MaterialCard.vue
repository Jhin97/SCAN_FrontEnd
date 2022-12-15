<template>
    <div class="card" data-animation="true">
        <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2" style="background-color: transparent;">
            <a class="d-block blur-shadow-image" style="text-align:center;">
                <img :src="option.imgUrl" alt="img-blur-shadow" class="img-fluid shadow border-radius-lg"
                    style="height: 250px;width: 250px;background-color: white;">
            </a>
        </div>
        <div class="card-body text-center">
            <div class="d-flex mt-n6 mx-auto">
                <el-button type="primary" icon="MoreFilled" style="margin: auto;" @click="viewDetail">View
                    Details</el-button>
            </div>
            <h5 class="font-weight-normal mt-3">
                {{ commonName }}
            </h5>
        </div>
        <hr class="dark horizontal my-0">
        <div class="card-footer d-flex">
            <el-icon>
                <ArrowRight />
            </el-icon>
            <p class="text-sm my-auto"> {{ latinName }}</p>
        </div>
    </div>

    <el-dialog v-model="dialogTableVisible" title="Shipping address" center>
        <CustomTable ref="table" entityType="TableDemo" dataSource="/api/panDemoData"></CustomTable>
    </el-dialog>

</template>

<style>
.card {
    margin-bottom: 60px;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import CustomTable from '@/components/CustomTable.vue';

const option = defineProps({
    //传参
    imgUrl: {
        type: String,
        required: true
    },
    commonName: {
        type: String,
        required: true
    },
    latinName: {
        type: String,
        required: true
    }
});
const dialogTableVisible = ref(false)

const viewDetail = () => {
    dialogTableVisible.value = true;
}
const table =ref(null);


// onMounted(() => {
//     console.log(option.imgUrl)
// })
</script>