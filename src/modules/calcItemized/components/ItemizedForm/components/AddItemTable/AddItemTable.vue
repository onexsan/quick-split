<template>
  <van-form>
    <legend>Items</legend>
    <table class="item-table">
      <thead>
        <th>Item</th>
        <th>Price</th>
        <th
          v-for="friend in friendList"
          :key="friend.id"
        >
          {{ friend.name }}
        </th>
        <th></th>
      </thead>
      <tbody>
        <TableItem
          v-for="item in itemList"
          :key="item.id"
          :item="item"
          :friendList="friendList"
          @deleteItem="deleteItem"
          @updateItem="updateItem"
        >
        </TableItem>
      </tbody>
    </table>
    <van-row class="mt-base">
      <van-button v icon="plus" size="mini" @click="changeItemList('add')">Add item</van-button>
    </van-row>
  </van-form>
</template>

<script lang="ts">
import TableItem from './components/TableItem/TableItem.vue';
type ItemType = {
  description: string | undefined,
  price: undefined | number,
  id: number
}
type FriendItem = {
  name : string | undefined,
  value: number | undefined,
  id: number
}
const defaultItem: ItemType = {
  description: '',
  price: undefined,
  id: 0
}
interface Props {
  friendList: FriendItem[]
}
</script>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
const props = defineProps<Props>()

const itemList = reactive<ItemType[]>([
  {
    ...defaultItem,
    id: 0
  }
])

const changeItemList = function(action: 'add' | 'remove', id?: number) {
  if (action === 'add') {
    itemList.push({
      ...defaultItem,
      id: Date.now()
    })
  } else if (action === 'remove' && id) {
    const foundItemIdx = itemList.findIndex((el) => el.id === id)
    itemList.splice(foundItemIdx, 1)
  }
  
}

const deleteItem = (id: number) => {
  changeItemList('remove', id)
}

const updateItem = (field: string, value: string | number | undefined, id: number) => {
  const itemToChange = itemList.find((el) => el.id === id)
  if (itemToChange) {
    itemToChange[field] = value
  }
}

</script>

<style lang="scss">
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