<template>
  <van-form class="itemized-form">
    <van-cell-group inset>
      <van-row class="friends-wrapper mt-base" justify="center">
        <p>Friends (max.15)</p>
        <van-stepper class="mt-base" max="15" v-model="friendsNumber" />
        <van-button class="mt-base" size="mini" @click="toggleFriends">{{ friendsShown ? 'Hide' : 'Show' }} friends</van-button>
      </van-row>
      <div class="group-wrapper">
        <div class="mt-base" v-if="friendsShown">
          <van-field
            class="friend"
            v-for="friend in friendList"
            :key="friend.id"
            left-icon="friends-o"
            right-icon="edit"
            :name="`friend-${friend.name}`"
            placeholder="Friend name"
            v-model="friend.name"
          />
        </div>
      </div>
      <div class="group-wrapper">
        <AddItemTable
          :friendList="friendList"
        >
        </AddItemTable>
      </div>
      <br/>
    </van-cell-group>
  </van-form>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
import AddItemTable from './components/AddItemTable/AddItemTable.vue';

type FriendItem = {
  name : string | undefined,
  value: number | undefined,
  id: number
}
const friendsShown = ref(false);
const toggleFriends = () => {
  friendsShown.value = !friendsShown.value
}
const friendsNumber = ref<number>(1);
const friendList = reactive<FriendItem[]>([
  {
    name : 'Friend 1',
    value: 0,
    id: Date.now()
  }
])
watch(friendsNumber, (val, oldVal) => {
  if (val > oldVal) {
    changeFriendList('add')
  } else {
    changeFriendList('remove')
  }
})

type ActionType = 'add' | 'remove'
const changeFriendList = (action: ActionType) => {
  if (action === 'add') {
    friendList.push({ name : `Friend ${friendList.length + 1}`, value: 0, id: Date.now()})
  } else if (action === 'remove') {
    if (friendList.length > 1){
      friendList.splice(friendList.length - 1, 1)
    }
  }
}
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
