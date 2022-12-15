<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <DefaultHeaderVue />
      </el-header>
      <el-main>
        <el-row :gutter="24" justify="center" class="cards-collection">
          <el-col v-for="(item, index) in speciesList[0] " :key="item" :span="5">
            <MaterialCardVue :imgUrl="require('@/assets/img/species/'+item.spid+'.png')" :commonName="item.commonName" :latinName="item.latinName"/>
          </el-col>
        </el-row>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>


<script setup>
import DefaultHeaderVue from '@/components/DefaultHeader.vue';
import MaterialCardVue from '@/components/MaterialCard.vue';
import { onMounted,getCurrentInstance,reactive } from 'vue';

const { proxy } = getCurrentInstance()
const speciesList = reactive([]);

onMounted(()=>{
  //load species list
  proxy.$http({url:"/species.json"}).then((res)=>{
    speciesList.push(res.data)
  }).catch((error)=>{
    console.log(error)
    alert("Loading species list error!")
  })
})
</script>

<style>
.cards-collection{
  margin-top: 40px;
}
</style>
