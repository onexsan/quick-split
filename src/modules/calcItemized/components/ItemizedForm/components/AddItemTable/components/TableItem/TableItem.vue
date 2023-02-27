<template>
  <tr>
    <td>
      <van-field
        :modelValue="props.item.itemName"
        @update:modelValue="updItem('itemName', $event)"
        left-icon="cart-o"
        placeholder="Name"
      />
    </td>
    <td>
      <van-field
        :modelValue="props.item.price"
        @update:modelValue="updItem('price', +$event)"
        type="number"
        placeholder="Price"
      />
    </td>
    <td
      v-for="friend in friendsList"
      :key="friend.id"
    >
      <van-button
        :type="includedFriends.includes(friend.id) ? 'primary' : 'default'"
        size="mini"
        class="debt-btn"
        @click="toggleFriendActivity(friend.id)"
      >
        {{ includedFriends.includes(friend.id) ? computedDebt : '-' }}
      </van-button>
    </td>
    <td class="delete-row">
      <van-button
        size="mini"
        icon="delete-o"
        class="border-none"
        @click="deleteItem"
      >
      </van-button>
    </td>
  </tr>
</template>

<script lang="ts">
type ItemType = {
  itemName: string | undefined,
  price: undefined | number,
  itemId: number
}
type Debt = {
  itemName:  undefined | number | string,
  itemId: number,
  debt: undefined | number,
  includedFriends: number[]
}
interface Props {
  item: ItemType
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import useSplit from '@/composables/useSplit'
import { useFriendsStore } from '@/stores/friends'
import { useItemsStore } from '@/stores/items'

const props = defineProps<Props>()

const friendsStore = useFriendsStore()
const friendsList = friendsStore.friendsList

const itemsStore = useItemsStore()
const changeItemList = itemsStore.changeItemList
const updateItem = itemsStore.updateItem

const computedDebt = computed(() => {
  if (!props.item.price || !includedFriends.value.length) {
    return 0
  }
  
  const split = useSplit({sum: props.item.price, divideBy: includedFriends.value.length})
  return split
})

const includedFriends = ref<number[]>([])
const excludedFriends = ref<number[]>([])

watch(friendsList, () => {
  const filteredFriends = friendsList.filter((el) => !excludedFriends.value.includes(el.id))
  includedFriends.value = filteredFriends.map((el) => el.id)
}, { immediate: true })

watch(computedDebt, (value) => {
  updateItem({
    id: props.item.itemId,
    debt: value
  })
}, {immediate: true})

watch(includedFriends, (value) => {
  updateItem({
    id: props.item.itemId,
    includedFriends: value
  })
})

watch(props.item, () => {
  friendsStore.handleDebt({
    itemName: props.item.itemName,
    itemId: props.item.itemId,
    debt: computedDebt.value,
    includedFriends: includedFriends.value
  })
})

const toggleFriendActivity = function(id: number) {
  if (includedFriends.value.includes(id)) {
    includedFriends.value = includedFriends.value.filter((el) => el !== id)
    excludedFriends.value.push(id)
  } else {
    includedFriends.value.push(id)
    excludedFriends.value = excludedFriends.value.filter((el) => el === id)
  }
}

const deleteItem = () => {
  changeItemList('remove', props.item.itemId)
}
const updItem = (field: string, value: string | number | undefined) => {
  updateItem({
    id: props.item.itemId, 
    field,
    value,
    debt: computedDebt.value,
    includedFriends: includedFriends.value
  })
}
</script>

<style lang="scss" scoped>
.debt-btn {
  min-width: 30px;
}
</style>