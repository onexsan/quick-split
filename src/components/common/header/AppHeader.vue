<template>
  <header class="header">
    {{ currentRoute }}
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute()

const currentRoute = computed(() => {
  return route.name
})


</script>

<style lang="scss" scoped>
.header {
  padding: 25px 0px 15px;
}
</style>