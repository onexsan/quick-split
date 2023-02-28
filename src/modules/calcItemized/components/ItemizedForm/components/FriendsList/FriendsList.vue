<template>
  <div class="friends">
    <van-row class="friends-wrapper mt-base" justify="center">
      <p>Friends (max.15)</p>
      <van-stepper
        class="mt-base"
        max="15"
        v-model="friendsNumber"
        :before-change="() => false"
        @plus="changeFriendsList('add')"
        @minus="changeFriendsList('removeLast')"
      />
      <van-button class="mt-base" size="mini" @click="toggleFriends">{{ friendsShown ? 'Hide' : 'Show' }} friends</van-button>
    </van-row>
    <div class="group-wrapper">
      <van-form class="mt-base" v-if="friendsShown">
        <van-row 
          v-for="friend in friendsList"
          :key="friend.id"
          align="center"
          justify="space-between"
          :wrap="false"
        >
          <van-field
            class="friend"
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
import { storeToRefs } from "pinia";

const store = useFriendsStore()
const { friendsNumber } = storeToRefs(store);

const friendsList = store.friendsList
const changeFriendsList = store.changeFriendsList

const friendsShown = ref(false);
const toggleFriends = () => {
  friendsShown.value = !friendsShown.value
}

const deleteFriend = (id: number) => {
  store.deleteFriend(id)
}

</script>