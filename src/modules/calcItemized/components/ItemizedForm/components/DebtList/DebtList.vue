<template>
  <van-cell-group class="debtor-list mb-base" inset>
    <van-cell
      v-if="paidSum && returnSum"
      :title="`${payer.name} paid ${paidSum} and gets back ${returnSum}`"
    >
    </van-cell>
    <van-collapse v-model="accordion" accordion>
      <DebtItem
        v-for="friend in simplifiedDebts"
        :key="friend.id"
        :friend="friend"
      />
    </van-collapse>
  </van-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
import DebtItem from './components/DebtItem.vue';

const store = useMainStore();
const { simplifiedDebts, payer, paidSum, returnSum } = storeToRefs(store);

const accordion = ref('accordion');
</script>

<style lang="scss" scoped>
.debtor-list {
  width: 400px;
  margin: 0 auto;
}
</style>
