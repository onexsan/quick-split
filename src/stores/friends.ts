import { ref, reactive, computed, watch } from "vue";
import { defineStore } from "pinia";

// Friends
type Friend = {
  name : string | undefined,
  debts: Debt[],
  id: number
}
const defaultFriend = {
  name : 'Friend 1',
  debts: [],
  id: Date.now()
}
// Debts
type Debt = {
  itemName: string | undefined,
  price: number,
  debt: number,
  itemId: number,
  includedFriends: number[]
}
type UpdateDebtObj = {
  id: number,
  field?: string,
  value?: string | number | undefined,
  debt?: number,
  includedFriends?: number[]
}
const defaultItem: Debt = {
  itemName: '',
  price: 0,
  debt: 0,
  itemId: 0,
  includedFriends: []
}

export const useFriendsStore = defineStore("friends", () => {
  // Friends
  const friendsList = reactive<Friend[]>([
    defaultFriend
  ])
  const friendsNumber = computed({
    get(): number {
      return friendsList.length
    },
    set(): void {
    }
  })

  const changeFriendsList = (action: 'add' | 'removeLast') => {
    if (action === 'add') {
      friendsList.push({ name : `Friend ${friendsList.length + 1}`, debts: [], id: Date.now()})
    } else if (action === 'removeLast') {
      if (friendsList.length > 1){
        friendsList.splice(friendsList.length - 1, 1)
      }
    }
  }
  const deleteFriend = (id: number) => {
    if (friendsList.length > 1) {
      const friendToDelete = friendsList.findIndex((el) => el.id === id)
      friendsList.splice(friendToDelete, 1)
    }
  }

  // Debts
  const debtList = reactive<Debt[]>([
    {
      ...defaultItem,
      itemId: Date.now()
    }
  ])
  const changeDebtList = function(action: 'add' | 'remove', id?: number) {
    if (action === 'add') {
      debtList.push({
        ...defaultItem,
        itemId: Date.now()
      })
    } else if (action === 'remove' && id) {
      const foundItemIdx = debtList.findIndex((el) => el.itemId === id)
      debtList.splice(foundItemIdx, 1)
    }
  }
  const updateDebtItem = (obj: UpdateDebtObj) => {
    const {id, field, value, debt, includedFriends} = obj
    const itemToChange = debtList.find((el) => el.itemId === id)
    if (itemToChange) {
      if (field) itemToChange[field] = value
      if (debt !== undefined) itemToChange.debt = debt
      if (includedFriends) itemToChange.includedFriends = includedFriends
    }
  }

  return {
    friendsList,
    friendsNumber,
    changeFriendsList,
    deleteFriend,
    debtList,
    changeDebtList,
    updateDebtItem
  };
});