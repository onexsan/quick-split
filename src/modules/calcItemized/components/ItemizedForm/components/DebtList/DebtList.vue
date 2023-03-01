<template>
  <van-cell-group class="debtor-list mb-base" inset>
    <van-collapse v-model="accordion" accordion>
      <DebtItem
        v-for="friend in friends"
        :key="friend.id"
        :friend="friend"
      />
    </van-collapse>
  </van-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from "pinia";
import DebtItem from './components/DebtItem.vue';

const store = useMainStore()
const { simplifiedDebts } = storeToRefs(store)
const friends = simplifiedDebts

const accordion = ref('accordion')
</script>

<style lang="scss" scoped>
.debtor-list {
  width: 300px;
  margin: 0 auto;
}
</style>