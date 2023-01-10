<template>
  <div class="main-container">
    <el-row :gutter="24" justify="center" class="cards-collection">
      <el-col v-for="(item, index) in speciesList[0] " :key="item" :span="5">
        <MaterialCardVue :imgUrl="require('@/assets/img/species/' + item.spid + '.png')" :commonName="item.commonName"
          :latinName="item.latinName" entityType="neuralPan" />
      </el-col>
    </el-row>
  </div>
</template>


<script setup>
import MaterialCardVue from '@/components/MaterialCard.vue';
import { onMounted, reactive } from 'vue';
import axios from 'axios';

const speciesList = reactive([]);

onMounted(() => {
  axios.get("/species.json").then((res) => {
    speciesList.push(res.data)
  }).catch((error) => {
    console.log(error)
    alert("Loading species list error!")
  })
})
</script>

<style>
.main-container {
  margin-top: 50px;
}

.cards-collection {
  margin-top: 40px;
}
</style>
