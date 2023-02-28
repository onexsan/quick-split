<template>
  <van-cell-group inset>
    <van-cell
      :title="friend.name"
      :value="friend.debts"
      v-for="friend in simplifiedDebts"
      :key="friend.id"
      />
      <br/>
  </van-cell-group>
</template>

<script lang="ts" setup>
import { useFriendsStore } from '@/stores/friends';
import { storeToRefs } from "pinia";

const friendsStore = useFriendsStore()
const { simplifiedDebts } = storeToRefs(friendsStore)
</script>
