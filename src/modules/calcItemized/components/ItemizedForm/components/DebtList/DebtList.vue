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
        :key="friend.itemId"
        :friend="friend"
      />
    </van-collapse>
  </van-cell-group>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { usePayerStore } from '@/stores/payer';
import { useDebtsStore } from '@/stores/debts';
import { storeToRefs } from 'pinia';
import DebtItem from './components/DebtItem';

const payerStore = usePayerStore();
const debtsStore = useDebtsStore();
const { payer, paidSum, returnSum } = storeToRefs(payerStore);
const { simplifiedDebts } = storeToRefs(debtsStore);

const accordion = ref('accordion');
</script>

<style lang="scss" scoped>
.debtor-list {
  width: 400px;
  margin: 0 auto;
}
</style>
