<template>
  <van-collapse-item
    :title="props.friend.itemName"
    :value="`owes ${props.friend.debt} to ${payer.name}`"
    :name="props.friend.itemId"
  >
    <ul v-if="fullData">
      <li v-for="item in fullData.debts" :key="item.itemId">
        {{ item.itemName }} - {{ item.debt }}
      </li>
    </ul>
  </van-collapse-item>
</template>

<script lang="ts">
import type { SimplifiedDebt } from '@/stores/types'
interface Props {
  friend: SimplifiedDebt;
}
</script>
<script lang="ts" setup>
import { computed } from 'vue';
import { usePayerStore } from '@/stores/payer';
import { useDebtsStore } from '@/stores/debts';
import { storeToRefs } from 'pinia';
const props = defineProps<Props>();

const payerStore = usePayerStore();
const { payer } = storeToRefs(payerStore);

const debtsStore = useDebtsStore();
const fullData = computed(() => {
  return debtsStore.getFullDebts(props.friend.itemId);
});
</script>
