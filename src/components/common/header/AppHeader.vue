<template>
  <header class="header">
    <van-row>
      <van-col span="8">
        <van-button
          v-if="showBackBtn"
          to="/"
          icon="arrow-left"
          class="back-btn"
        />
      </van-col>
      <van-col class="center" :span="8">
        <RouterLink class="logo" to="/">
          Quick Split
        </RouterLink>
      </van-col>
    </van-row>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const showBackBtn = computed(() => {
  const route = useRoute()
  return !!(route.name !== 'Home')
})
</script>

<style lang="scss" scoped>
.header {
  padding-bottom: var(--space-base);

  .logo {
    align-self: center;
    font-weight: 600;
    font-size: var(--space-md);
  }
  .center {
    display: flex;
    align-content: center;
    justify-content: center;
  }

  .back-btn {
    border: none;
    padding: var(--space-sm);
    height: 38px;

    &:hover {
      color: var(--primary);
    }
  }
}
</style>