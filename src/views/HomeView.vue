<template>
  <div class="container-fluid header bg-primary p-0">
    <div class="row g-0 align-items-center flex-column-reverse flex-lg-row">
      <div class="col-lg-6 p-5 wow fadeIn" data-wow-delay="0.1s">
        <h1 class="display-4 text-white mb-5" style="font-size: 32px; ">SCAN:
          <span style="font-size: 18px;"><span style="color: #ffdab9; font-size: 24px;">S</span>patiotemporal
            <span style="color: #ffdab9; font-size: 24px;">C</span>loud <span
              style="color: #ffdab9; font-size: 24px;">A</span>tlas for <span
              style="color: #ffdab9; font-size: 24px;">N</span>eural cells</span>
          <p style="font-size: 14px; font-weight: normal;">Recently, technological advances have enabled
            researchers to go beyond just sequencing the ‘omes’. Spatially resolved transcriptomics was invented
            by Lundeberg, Frisen and Stahl at KHL Royal Institute of Technology in Sweden in 2016. This technology
            was able to provide gene expression data for a large number of cells, whilst simultaneously adding
            positional context. Today, it is possible to analyse tens of thousands of genes localized in a small
            section of tissue. Spatial information about the molecular characteristics behind these genes helps to
            unravel the heterogeneity among cells, and offers valuable insights into the cause-and-effect
            relationships behind certain diseases.</p>
          <p style="font-size: 14px; font-weight: normal;">Emerging technologies for genome-wide spatial
            transcriptomics have the potential to provide detailed molecular maps. They use an on-slide
            complementary DNA synthesis approach, allowing the capturing of gene expression architecture in intact
            tissue. This means that information from important processes is retained. Recently, 10x Genomics
            released their new ‘Visium’ platform – boasting a five-fold increase in resolution compared to the
            first generation of spatial transcriptomics technologies.</p>
        </h1>

        <div class="row g-4">
          <Counter />
        </div>
      </div>
      <div class="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
        <el-carousel :interval="5000" arrow="always" fit="cover" height="800px">
          <el-carousel-item>
            <el-image :src="require('@/assets/img/banner/carousel-1.jpeg')" />
          </el-carousel-item>
          <el-carousel-item>
            <el-image :src="require('@/assets/img/banner/carousel-2.jpeg')" />
          </el-carousel-item>
          <el-carousel-item>
            <el-image :src="require('@/assets/img/banner/carousel-3.jpeg')" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script setup>
import Counter from '@/components/PresentationCounter.vue';

</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 500px;
  /* height: 500px; */
}

.bg-primary {
  background-color: blue !important;
}
</style>