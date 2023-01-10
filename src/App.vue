<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <DefaultHeaderVue />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
      <el-footer>
        <DefaultFooterVue />
      </el-footer>
    </el-container>
  </div>
</template>


<script setup>
import DefaultHeaderVue from '@/components/DefaultHeader.vue';
import DefaultFooterVue from '@/components/DefaultFooter.vue';
</script>

<style scoped>
.el-header {
  --el-header-padding: 0px;
}

.el-main {
  --el-main-padding: 0px;
}

.el-footer {
  --el-footer-padding: 0px;
}
</style>