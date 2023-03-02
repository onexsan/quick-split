import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Friend } from './types';
import { useFriendsStore } from './friends';
import { useItemsStore } from './items';
import { useDebtsStore } from './debts';

export const usePayerStore = defineStore('payer', () => {
  const friendStore = useFriendsStore();
  const itemsStore = useItemsStore();
  const debtsStore = useDebtsStore();

  const payer = ref<Friend>(friendStore.friendsList[0]);

  const updatePayer = (id: number) => {
    const foundFriend = friendStore.friendsList.find(el => el.id === id);
    payer.value = foundFriend as Friend;
  };

  const paidSum = computed(() => {
    return itemsStore.itemList.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  });

  const returnSum = computed(() => {
    if (!debtsStore.simplifiedDebts.length) return 0;
    const debtSum = debtsStore.simplifiedDebts.reduce(
      (acc: number, item: any) => {
        return (acc += item.debts);
      },
      0
    );
    return debtSum;
  });

  return {
    payer,
    paidSum,
    returnSum,
    updatePayer,
  };
});
