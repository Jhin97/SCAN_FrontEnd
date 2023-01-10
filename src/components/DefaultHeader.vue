<template>
  <el-affix :offset="0">
    <el-menu :default-active="$route.path" class="default-header" mode="horizontal" :ellipsis="false" router>
      <el-menu-item>SCAN</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/">HOME</el-menu-item>
      <el-sub-menu index="3" show-timeout="10" popper-offset="0">
        <template #title>DATA MODULES</template>
        <el-menu-item index="/neuralST">Neural ST</el-menu-item>
        <el-menu-item index="/neuralPan">Neural Pan</el-menu-item>
        <el-menu-item index="3-3">Neural Diz</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="4" show-timeout="10" popper-offset="0">
        <template #title>FUNCTION MODULES</template>
        <el-menu-item index="4-1">Neural Talk</el-menu-item>
        <el-menu-item index="4-2">Neural Meta</el-menu-item>
        <el-menu-item index="4-3">Neural Anno</el-menu-item>
        <el-menu-item index="4-4">Neural Reg</el-menu-item>
        <el-menu-item index="/neuralTree">Neural Tree</el-menu-item>
        <el-menu-item index="4-6">Neural Target</el-menu-item>
        <el-menu-item index="4-7">Neural D2C</el-menu-item>
        <el-menu-item index="4-8">Neural Int</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="5" show-timeout="10" popper-offset="0">
        <template #title>EVODEVO MODULES</template>
        <el-menu-item index="5-1">Neural Evo</el-menu-item>
        <el-menu-item index="5-2">Neural Devo</el-menu-item>
        <el-menu-item index="5-3">Neural CS</el-menu-item>
      </el-sub-menu>
      <el-sub-menu index="6" show-timeout="10" popper-offset="0">
        <template #title>DISPLAY MODULES</template>
        <el-menu-item index="6-1">User Guideline</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </el-affix>

</template>
  
  
<style scoped>

.flex-grow {
  flex-grow: 1;
}

.el-header li:first-child {
  font-weight: 700;
  font-size: 2.5rem;
  color: #0463FA !important;
}

.el-header li {
  font-weight: 600;
  font-size: 15px;
}

.el-menu--horizontal {
  border-bottom: none;
}
</style>
  