<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import AppHeader from '@/components/common/header'

const route = useRoute()
const isItemized = computed(() => {
  return route.name === 'CalcItemizedView'
})
</script>

<template>
  <van-config-provider :class="isItemized && '_wide'" theme="dark">
    <AppHeader />
    <RouterView />
  </van-config-provider>
</template>

