import { reactive, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Friend } from './types';
import { defaultFriend } from './defaults';

export const useFriendsStore = defineStore('friends', () => {
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

  return {
    friendsList,
    friendsNumber,
    changeFriendsList,
    deleteFriend,
  };
});
