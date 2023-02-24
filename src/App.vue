<script setup lang="ts">
import AppHeader from '@/components/common/header'
import { RouterView } from "vue-router";
</script>

<template>
  <div class="wrapper">
    <AppHeader />
    <RouterView />
  </div>
</template>

