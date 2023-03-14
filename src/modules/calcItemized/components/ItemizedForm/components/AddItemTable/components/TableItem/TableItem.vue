<template>
  <tr>
    <td>
      <van-field
        :modelValue="props.item.itemName"
        @update:modelValue="updItem('itemName', $event)"
        left-icon="cart-o"
        right-icon="edit"
        placeholder="Name"
      />
    </td>
    <td>
      <van-field
        :modelValue="props.item.price"
        @update:modelValue="updItem('price', +$event)"
        type="number"
        placeholder="Price"
      />
    </td>
    <td v-for="friend in friendsList" :key="friend.id">
      <van-button
        :type="includedFriends.includes(friend.id) ? 'primary' : 'default'"
        size="mini"
        class="debt-btn"
        @click="toggleFriendActivity(friend.id)"
      >
        {{ includedFriends.includes(friend.id) ? computedDebt : '-' }}
      </van-button>
    </td>
    <td class="delete-row">
      <van-button
        size="mini"
        icon="delete-o"
        class="border-none"
        @click="deleteItem"
        :disabled="itemList.length < 2"
      >
      </van-button>
    </td>
  </tr>
</template>

<script lang="ts">
import type { Debt } from '@/stores/types';
interface Props {
  item: Debt;
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useSplit } from '@/composables/useSplit';
import { useFriendsStore } from '@/stores/friends';
import { useItemsStore } from '@/stores/items';

const props = defineProps<Props>();

const friendsStore = useFriendsStore();
const friendsList = friendsStore.friendsList;

const itemsStore = useItemsStore();
const itemList = itemsStore.itemList;
const changeItemList = itemsStore.changeItemList;
const updateItem = itemsStore.updateItem;

const computedDebt = computed(() => {
  return useSplit({
    sum: +props.item.price,
    divideBy: includedFriends.value.length,
  });
});

const includedFriends = ref<number[]>([]);
const excludedFriends = ref<number[]>([]);

watch(
  friendsList,
  () => {
    includedFriends.value = friendsList.filter(
      el => !excludedFriends.value.includes(el.id)
    ).map(el => el.id);
  },
  { immediate: true }
);

watch(
  computedDebt,
  value => {
    updateItem({
      id: props.item.itemId,
      debt: value,
    });
  },
  { immediate: true }
);

watch(includedFriends, value => {
  updateItem({
    id: props.item.itemId,
    includedFriends: value,
  });
});

const toggleFriendActivity = function (id: number) {
  if (includedFriends.value.includes(id)) {
    includedFriends.value = includedFriends.value.filter(el => el !== id);
    excludedFriends.value.push(id);
  } else {
    includedFriends.value.push(id);
    excludedFriends.value = excludedFriends.value.filter(el => el === id);
  }
};

const deleteItem = () => {
  changeItemList('remove', props.item.itemId);
};
const updItem = (field: 'itemName' | 'price', value: string | number) => {
  updateItem({
    id: props.item.itemId,
    field,
    value,
    debt: computedDebt.value,
    includedFriends: includedFriends.value,
  });
};
</script>

<style lang="scss" scoped>
.debt-btn {
  min-width: 30px;
}
</style>
