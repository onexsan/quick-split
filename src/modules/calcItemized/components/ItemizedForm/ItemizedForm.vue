<template>
  <van-form class="itemized-form">
    <van-cell-group inset>
      <FriendsList />
      <div class="group-wrapper">
        <AddItemTable />
      </div>
      <div class="group-wrapper mb-base">
        <DebtList />
      </div>
    </van-cell-group>
  </van-form>
</template>

<script lang="ts" setup>
import FriendsList from './components/FriendsList/FriendsList.vue';
import AddItemTable from './components/AddItemTable/AddItemTable.vue';
import DebtList from './components/DebtList/DebtList.vue';
</script>

<style lang="scss">
.show-friends-btn {
  .van-button__icon {
    font-size: 12px;
    margin-top: 3px;
  }
}
.friends-item {
  max-width: 300px;
}
.friends-item__input {
  .van-cell {
    padding: 8px;
  }
}

.popup {
  padding: 20px;
  border-radius: var(--border-radius);
  min-width: 520px;
}
</style>
