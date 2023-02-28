<template>
  <van-form class="add-item-view">
    <table class="item-table">
      <thead>
        <th>Item</th>
        <th>Price</th>
        <th
          v-for="friend in friendsList"
          :key="friend.id"
        >
          {{ friend.name }}
        </th>
        <th></th>
      </thead>
      <tbody>
        <TableItem
          v-for="item in debtList"
          :key="item.itemId"
          :item="item"
        >
        </TableItem>
      </tbody>
    </table>
    <van-row class="mt-base">
      <van-button icon="plus" size="mini" @click="changeDebtList('add')">Add item</van-button>
    </van-row>
  </van-form>
</template>

<script lang="ts">
import TableItem from './components/TableItem/TableItem.vue';

</script>

<script lang="ts" setup>
import { useFriendsStore } from '@/stores/friends';

const friendsStore = useFriendsStore()
const friendsList = friendsStore.friendsList

const debtList = friendsStore.debtList
const changeDebtList = friendsStore.changeDebtList
</script>

<style lang="scss">
.add-item-view {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.item-table {
  th, td {
    font-size: 10px;
  }

  th, td {
    text-align: center;
    &:first-child {
      max-width: 25%;
    }
    &:nth-child(2) {
      max-width: 15%;
    }

    &.delete-row {
      button {
        margin-right: var(--space-base);
        margin-left: var(--space-base);
      }
    }
  }
}
</style>