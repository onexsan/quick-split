import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Debt, UpdateDebtObj } from './types';
import { defaultItem } from './defaults';

export const useItemsStore = defineStore('items', () => {
  const itemList = reactive<Debt[]>([
    {
      ...defaultItem,
      itemId: Date.now(),
    },
  ]);
  const changeItemList = function (action: 'add' | 'remove', id?: number) {
    if (action === 'add') {
      itemList.push({
        itemName: `Item ${itemList.length + 1}`,
        price: 0,
        debt: 0,
        itemId: Date.now(),
        includedFriends: [],
      });
    } else if (action === 'remove' && id) {
      if (itemList.length > 1) {
        const foundItemIdx = itemList.findIndex(el => el.itemId === id);
        itemList.splice(foundItemIdx, 1);
      }
    }
  };
  const updateItem = (obj: UpdateDebtObj) => {
    const { id, field, value, debt, includedFriends } = obj;
    const itemToChange: any = itemList.find(el => el.itemId === id);
    if (itemToChange) {
      if (field) itemToChange[field] = value;
      if (debt !== undefined) itemToChange.debt = debt;
      if (includedFriends) itemToChange.includedFriends = includedFriends;
    }
  };

  return {
    itemList,
    changeItemList,
    updateItem,
  };
});
