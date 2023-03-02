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
import { useMainStore } from '@/stores/main';
import { storeToRefs } from 'pinia';
const props = defineProps<Props>();

const store = useMainStore();
const { payer } = storeToRefs(store);

const getFullDebts = store.getFullDebts;
const fullData = computed(() => {
  return getFullDebts(props.friend.id);
});
</script>
