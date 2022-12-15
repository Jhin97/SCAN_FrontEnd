<template>
    <el-menu
      :default-active="activeIndex"
      class="default-header"
      mode="horizontal"
      :ellipsis="false"
      router
    >
      <el-menu-item index="/">SCAN</el-menu-item>
      <div class="flex-grow" />
      <el-menu-item index="/neural_ST">Neural ST</el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
    </el-menu>
  </template>
  
  <script setup>

  </script>
  
  <style>
  .flex-grow {
    flex-grow: 1;
  }
  </style>
  