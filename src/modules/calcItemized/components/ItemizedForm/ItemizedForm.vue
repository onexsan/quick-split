<template>
  <van-form class="itemized-form">
    <van-cell-group inset>
      <FriendsList />
      <div class="group-wrapper">
        <AddItemTable />
      </div>
      <br/>
    </van-cell-group>
  </van-form>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import AddItemTable from './components/AddItemTable/AddItemTable.vue';
import FriendsList from './components/FriendsList/FriendsList.vue';
</script>

<style lang="scss">
.friends-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
.show-friends-btn {
  .van-button__icon {
    font-size: 12px;
    margin-top: 3px;
  }
}

.friend {
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
