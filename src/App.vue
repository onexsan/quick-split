<script setup lang="ts">
import AppHeader from '@/components/common/header'
import { RouterView } from "vue-router";
</script>

<template>
  <van-config-provider theme="dark">
    <AppHeader />
    <RouterView />
  </van-config-provider>
</template>

