import { computed } from 'vue';
import { defineStore } from 'pinia';
import type { SimplifiedDebt, FriendsMap } from './types';
import { useFriendsStore } from './friends';
import { useItemsStore } from './items';
import { usePayerStore } from './payer';

export const useDebtsStore = defineStore('debts', () => {
  const friendsStore = useFriendsStore();
  const itemsStore = useItemsStore();
  const payerStore = usePayerStore();

  const friendsWithDebts = computed((): FriendsMap => {
    const map: FriendsMap = {};

    itemsStore.itemList.forEach(debt => {
      const friends = debt.includedFriends;
      friends.forEach(friend => {
        const foundFriend = friendsStore.friendsList.find(
          el => el.id === friend
        );
        let foundFriendName;
        if (foundFriend) foundFriendName = foundFriend.name;

        const defaultDebt: SimplifiedDebt = {
          itemId: debt.itemId,
          debt: debt.debt,
          itemName: debt.itemName.toString(),
        };
        if (!map[friend] && foundFriendName) {
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

  const simplifiedDebts = computed((): SimplifiedDebt[] => {
    return Object.keys(friendsWithDebts.value)
      .map((key: string) => {
        const friend = friendsWithDebts.value[+key];
        return {
          itemName: friend.name,
          itemId: +key,
          debt: friend.debts.reduce((acc, item) => (acc += item.debt), 0),
        };
      })
      .filter(el => el.debt !== 0 && el.itemId !== payerStore.payer.id);
  });

  const getFullDebts = (id: number) => {
    return friendsWithDebts.value[id];
  };

  return {
    friendsWithDebts,
    simplifiedDebts,
    getFullDebts,
  };
});
