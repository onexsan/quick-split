import { ref, reactive, computed } from "vue";
import { defineStore } from "pinia";

type Debt = {
  itemName:  undefined | number | string,
  itemId: number,
  debt: undefined | number,
  includedFriends: number[]
}
type Friend = {
  name : string | undefined,
  debts: Debt[],
  id: number
}
type ActionType = 'add' | 'removeLast'
const defaultFriend = {
  name : 'Friend 1',
  debts: [],
  id: Date.now()
}

export const useFriendsStore = defineStore("friends", () => {
  const friendsList = reactive<Friend[]>([
    defaultFriend
  ])
  const debtList = reactive<Debt[]>([])
  const friendsNumber = computed({
    get(): number {
      return friendsList.length
    },
    set(): void {
    }
  })

  const changeFriendsList = (action: ActionType) => {
    if (action === 'add') {
      friendsList.push({ name : `Friend ${friendsList.length + 1}`, debts: [], id: Date.now()})
    } else if (action === 'removeLast') {
      if (friendsList.length > 1){
        friendsList.splice(friendsList.length - 1, 1)
      }
    }
  }
  const deleteFriend = (id: number) => {
    const friendToDelete = friendsList.findIndex((el) => el.id === id)
    friendsList.splice(friendToDelete, 1)
  }
  const handleDebt = (debtItem: Debt) => {
    const debtExists = debtList.findIndex((el) => el.itemId === debtItem.itemId)
    if (debtItem.debt) {
      if (debtExists < 0) {
        debtList.push(debtItem)
      } else {
        debtList[debtExists] = debtItem
      }
    } else {
      if (debtExists > 0) {
        friendsList.splice(debtExists, 1)
      }
    }
  }


  return {
    friendsList,
    friendsNumber,
    changeFriendsList,
    deleteFriend,
    debtList,
    handleDebt
  };
});