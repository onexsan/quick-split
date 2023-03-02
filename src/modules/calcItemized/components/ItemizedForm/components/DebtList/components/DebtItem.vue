<template>
  <van-collapse-item
    :title="props.friend.name"
    :value="`owes ${props.friend.debts} to ${payer.name}`"
    :name="props.friend.id"
  >
    <ul v-if="fullData">
      <li v-for="item in fullData.debts" :key="item.itemId">
        {{ item.itemName }} - {{ item.debt }}
      </li>
    </ul>
  </van-collapse-item>
</template>

<script lang="ts">
type Friend = {
  name: string | undefined;
  debts: number;
  id: number;
};
interface Props {
  friend: Friend;
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
const getFullDebts = debtsStore.getFullDebts;
const fullData = computed(() => {
  return getFullDebts(props.friend.id);
});
</script>
