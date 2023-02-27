import { reactive } from "vue";
import { defineStore } from "pinia";

type ItemType = {
  itemName: string | undefined,
  price: undefined | number,
  debt: undefined | number,
  itemId: number,
  includedFriends: number[]
}
type UpdateObj = {
  id: number,
  field?: string,
  value?: string | number | undefined,
  debt?: undefined | number,
  includedFriends?: number[]
}
const defaultItem: ItemType = {
  itemName: '',
  price: undefined,
  debt: undefined,
  itemId: 0,
  includedFriends: []
}

export const useItemsStore = defineStore("items", () => {
  const itemList = reactive<ItemType[]>([
    {
      ...defaultItem,
      itemId: Date.now()
    }
  ])
  const changeItemList = function(action: 'add' | 'remove', id?: number) {
    if (action === 'add') {
      itemList.push({
        ...defaultItem,
        itemId: Date.now()
      })
    } else if (action === 'remove' && id) {
      const foundItemIdx = itemList.findIndex((el) => el.itemId === id)
      itemList.splice(foundItemIdx, 1)
    }
  }
  const updateItem = (obj: UpdateObj) => {
    const {id, field, value, debt, includedFriends} = obj
    const itemToChange = itemList.find((el) => el.itemId === id)
    if (itemToChange) {
      if (field) itemToChange[field] = value
      if (debt) itemToChange.debt = debt
      if (includedFriends) itemToChange.includedFriends = includedFriends
    }
  }

  return {itemList, changeItemList, updateItem}
});