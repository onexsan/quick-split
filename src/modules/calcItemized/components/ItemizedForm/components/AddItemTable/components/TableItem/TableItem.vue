<template>
  <tr>
    <td>
      <van-field
        :modelValue="props.item.itemName"
        @update:modelValue="updItem('itemName', $event)"
        left-icon="cart-o"
        right-icon="edit"
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
        :disabled="debtList.length < 2"
      >
      </van-button>
    </td>
  </tr>
</template>

<script lang="ts">
type Debt = {
  itemName: string | undefined,
  price: number,
  debt: number,
  itemId: number,
  includedFriends: number[]
}
interface Props {
  item: Debt
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import useSplit from '@/composables/useSplit'
import { useMainStore } from '@/stores/main'

const props = defineProps<Props>()

const store = useMainStore()
const friendsList = store.friendsList
const debtList = store.itemList

const changeItemList = store.changeItemList
const updateItem = store.updateItem

const computedDebt = computed(() => {
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