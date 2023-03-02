<template>
  <div class="friends-block">
    <van-row class="d-flex-center mt-base" justify="center">
      <p>Friends</p>
      <van-stepper
        class="mt-base"
        max="15"
        v-model="friendsNumber"
        :before-change="() => false"
        @plus="changeFriendsList('add')"
        @minus="changeFriendsList('removeLast')"
      />
      <PayerSelector class="mt-base" />
      <van-button class="mt-base" size="mini" @click="toggleFriends"
        >{{ friendsShown ? 'Hide' : 'Edit' }} friends</van-button
      >
    </van-row>
    <div class="group-wrapper">
      <van-form class="d-flex-center mt-base" v-if="friendsShown">
        <van-row
          class="friends-item"
          v-for="friend in friendsList"
          :key="friend.id"
          align="center"
          justify="space-between"
          :wrap="false"
        >
          <van-field
            class="friends-item__input"
            required
            :error="!friend.name"
            left-icon="friends-o"
            right-icon="edit"
            :name="`friend-${friend.name}`"
            placeholder="Friend name"
            v-model="friend.name"
          />
          <van-button
            size="mini"
            icon="delete-o"
            class="border-none"
            @click="deleteFriend(friend.id)"
            :disabled="friendsList.length < 2"
          >
          </van-button>
        </van-row>
      </van-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFriendsStore } from '@/stores/friends';
import { storeToRefs } from 'pinia';
import PayerSelector from '../PayerSelector/PayerSelector.vue';

const friendsStore = useFriendsStore();
const { friendsNumber } = storeToRefs(friendsStore);

const friendsList = friendsStore.friendsList;
const changeFriendsList = friendsStore.changeFriendsList;

const friendsShown = ref(false);
const toggleFriends = () => {
  friendsShown.value = !friendsShown.value;
};

const deleteFriend = (id: number) => {
  friendsStore.deleteFriend(id);
};
</script>
