<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from '@/components/headers/TheHeader.vue';
</script>

<template>
  <div class="vh-100">
    <TheHeader />
    <div class="container-fluid bg-light">
      <RouterView />
    </div>
  </div>
</template>

<style scoped>
</style>
