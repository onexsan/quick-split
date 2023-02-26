<template>
  <tr>
    <td>
      <van-field
        :modelValue="props.item.description"
        @update:modelValue="updateItem('description', $event)"
        left-icon="cart-o"
        placeholder="Description"
      />
    </td>
    <td>
      <van-field
        :modelValue="props.item.price"
        @update:modelValue="updateItem('price', +$event)"
        type="number"
        placeholder="Price"
      />
    </td>
    <td
      v-for="friend in friendList"
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
  description: string | undefined,
  price: undefined | number,
  id: number
}
type FriendItem = {
  name : string | undefined,
  value: number | undefined,
  id: number
}
interface Props {
  item: ItemType,
  friendList: FriendItem[]
}
</script>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import useSplit from '@/composables/useSplit'

const props = defineProps<Props>()

const computedDebt = computed(() => {
  if (!props.item.price || !includedFriends.value.length) {
    return '0'
  }
  
  const split = useSplit({sum: props.item.price, divideBy: includedFriends.value.length})
  return split
})

const includedFriends = ref<number[]>([])
const excludedFriends = ref<number[]>([])

watch(props.friendList, () => {
  const filteredFriends = props.friendList.filter((el) => !excludedFriends.value.includes(el.id))
  includedFriends.value = filteredFriends.map((el) => el.id)
}, { immediate: true })

const toggleFriendActivity = function(id: number) {
  if (includedFriends.value.includes(id)) {
    includedFriends.value = includedFriends.value.filter((el) => el !== id)
    excludedFriends.value.push(id)
  } else {
    includedFriends.value.push(id)
    excludedFriends.value = excludedFriends.value.filter((el) => el === id)
  }
}

const emit = defineEmits<{
  (e: 'deleteItem', id: number): void,
  (e: 'updateItem', field: string, value: string | number | undefined, id: number): void
}>()

const deleteItem = () => {
  emit('deleteItem', props.item.id)
}
const updateItem = (field: string, value: string | number | undefined) => {
  emit('updateItem', field, value, props.item.id)
}
</script>

<style lang="scss" scoped>
.debt-btn {
  min-width: 30px;
}
</style>