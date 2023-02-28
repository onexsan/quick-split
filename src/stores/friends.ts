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

  type SimplifiedDebt = {
    itemId: number,
    debt: number,
    itemName: string | undefined
  }
  type friendWithDebt = {
    name: string | undefined,
    debts: SimplifiedDebt[]
  }
  type FriendsMap = {
    [key: number]: friendWithDebt
  }
  const friendsWithDebts = computed((): FriendsMap => {
    const map: FriendsMap = {}
    debtList.forEach((debt) => {
      const friends = debt.includedFriends
      friends.forEach((friend) => {
        const foundFriend = friendsList.find((el) => el.id === friend)
        let foundFriendName
        if (foundFriend) foundFriendName = foundFriend.name

        const defaultDebt: SimplifiedDebt = {
          itemId: debt.itemId,
          debt: debt.debt,
          itemName: debt.itemName
        }
        if (!map[friend]) {
          map[friend] = {
            name: foundFriendName,
            debts: []
          }
          map[friend].debts.push(defaultDebt)
        } else {
          let foundItem = map[friend].debts.find((el: SimplifiedDebt) => el.itemId === debt.itemId)
          if (foundItem) {
            foundItem = defaultDebt
          } else {
            map[friend].debts.push(defaultDebt)
          }
        }
      })
    })
    return map
  })

  const simplifiedDebts = computed(() => {
    return Object.keys(friendsWithDebts.value).map((key: any) => {
      const friend = friendsWithDebts.value[key]
      return {
        name: friend.name,
        id: +key,
        debts: friend.debts.reduce((acc, item) => acc += item.debt, 0)
      }
    })
  })

  return {
    friendsList,
    friendsNumber,
    changeFriendsList,
    deleteFriend,
    debtList,
    friendsWithDebts,
    simplifiedDebts,
    changeDebtList,
    updateDebtItem
  };
});