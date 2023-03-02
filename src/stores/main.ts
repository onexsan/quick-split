import { ref, reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import type {
  Friend,
  Debt,
  UpdateDebtObj,
  SimplifiedDebt,
  FriendsMap,
} from './types';
import { defaultFriend, defaultItem } from './defaults';

export const useMainStore = defineStore('main', () => {
  // Friends
  const friendsList = reactive<Friend[]>([defaultFriend]);
  const friendsNumber = computed({
    get(): number {
      return friendsList.length;
    },
    set(): void {},
  });

  const changeFriendsList = (action: 'add' | 'removeLast') => {
    if (action === 'add') {
      friendsList.push({
        name: `Friend ${friendsList.length + 1}`,
        debts: [],
        id: Date.now(),
      });
    } else if (action === 'removeLast') {
      if (friendsList.length > 1) {
        friendsList.splice(friendsList.length - 1, 1);
      }
    }
  };
  const deleteFriend = (id: number) => {
    if (friendsList.length > 1) {
      const friendToDelete = friendsList.findIndex(el => el.id === id);
      friendsList.splice(friendToDelete, 1);
    }
  };

  // Payer
  const payer = ref<Friend>(friendsList[0]);

  const updatePayer = (id: number) => {
    const foundFriend = friendsList.find(el => el.id === id);
    payer.value = foundFriend as Friend;
  };

  const paidSum = computed(() => {
    return itemList.reduce((acc, item) => {
      return (acc += item.price);
    }, 0);
  });

  const returnSum = computed(() => {
    if (!simplifiedDebts.value.length) return 0;
    const debtSum = simplifiedDebts.value.reduce((acc, item) => {
      return (acc += item.debts);
    }, 0);
    return debtSum;
  });

  // Debts
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

  // Computed lists
  const friendsWithDebts = computed((): FriendsMap => {
    const map: FriendsMap = {};

    itemList.forEach(debt => {
      const friends = debt.includedFriends;
      friends.forEach(friend => {
        const foundFriend = friendsList.find(el => el.id === friend);
        let foundFriendName;
        if (foundFriend) foundFriendName = foundFriend.name;

        const defaultDebt: SimplifiedDebt = {
          itemId: debt.itemId,
          debt: debt.debt,
          itemName: debt.itemName,
        };
        if (!map[friend]) {
          map[friend] = {
            name: foundFriendName,
            id: friend,
            debts: [],
          };
          map[friend].debts.push(defaultDebt);
        } else {
          let foundItem = map[friend].debts.find(
            (el: SimplifiedDebt) => el.itemId === debt.itemId
          );
          if (foundItem) {
            foundItem = defaultDebt;
          } else {
            map[friend].debts.push(defaultDebt);
          }
        }
      });
    });
    return map;
  });

  const simplifiedDebts = computed(() => {
    return Object.keys(friendsWithDebts.value)
      .map((key: any) => {
        const friend = friendsWithDebts.value[key];
        return {
          name: friend.name,
          id: +key,
          debts: friend.debts.reduce((acc, item) => (acc += item.debt), 0),
        };
      })
      .filter(el => el.debts !== 0 && el.id !== payer.value.id);
  });

  const getFullDebts = (id: number) => {
    return friendsWithDebts.value[id];
  };

  return {
    friendsList,
    friendsNumber,
    changeFriendsList,
    deleteFriend,
    payer,
    paidSum,
    returnSum,
    updatePayer,
    itemList,
    changeItemList,
    updateItem,
    friendsWithDebts,
    simplifiedDebts,
    getFullDebts,
  };
});
