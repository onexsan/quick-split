<template>
  <van-form class="itemized-form">
    <van-cell-group inset>
      <van-cell title="Friends">
        <template #right-icon>
          <van-stepper v-model="friendsNumber" />
        </template>
      </van-cell>
      <van-collapse v-model="accordion" :border="false">
        <van-collapse-item
          title="Show friends"
        >
        <van-field
          class="item"
          v-for="friend in list"
          :key="friend.id"
          left-icon="friends-o"
          :name="`friend-${friend.name}`"
          placeholder="Friend name"
          v-model="friend.name"
        />
        </van-collapse-item>
      </van-collapse>
      <div class="group-wrapper">
        <van-row
          v-for="(item, index) in items"
          :key="index"
          class="item"
          align="center"
          justify="space-between"
          :wrap="false"
        >
          <van-field
            v-model.number="item.description"
            left-icon="cart-o"
            :name="`item-${index}`"
            placeholder="Description"
          />
          <van-field
            v-model.number="item.sum"
            type="number"
            :name="`sum-${index}`"
            placeholder="Sum"
          />
          <van-button
            v-for="friend in list"
            :key="friend.id"
            size="mini"
          >
            {{ friend.name }}
          </van-button>
          <van-button
            type="primary"
            v-show="index != 0"
            size="mini"
          >
            Remove
          </van-button>
        </van-row>
      </div>
      <br/>
    </van-cell-group>
  </van-form>
</template>

<script lang="ts" setup>
import { ref, reactive, watch } from 'vue';
// import FriendsList from './components/FriendsList/FriendsList.vue';

const accordion = ref(['1']);
const friendsNumber = ref<number>(1);
const list = reactive([
  { name : 'Friend 1', value: 0, id: 1}
])
watch(friendsNumber, (val, oldVal) => {
  if (val > oldVal) {
    addRow(val)
  } else {
    removeRow(val)
  }
})
const addRow = (id: number) => {
  list.push({ name : `Friend ${id}`, value: 0, id: id})
}
const removeRow = (index: number) =>{
  if(list.length > 1){
    list.splice(index,1)
  }
}

const items = reactive([
  {
    description: '',
    sum: undefined
  }
])

</script>

<style lang="scss">
.show-friends-btn {
  .van-button__icon {
    font-size: 12px;
    margin-top: 3px;
  }
}

.item {
  .van-cell {
    padding: 8px;
  }
}
</style>
