<template>
  <div class="d-flex-center">
    <van-row align="center" justify="space-between">
      <p class="mr-sm">Who pays</p>
      <select class="selector" v-model="payerId">
        <option v-for="item in friendsList" :key="item.id" :value="item.id">
          {{ item.name }}
        </option>
      </select>
    </van-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from 'vue';
import { useFriendsStore } from '@/stores/friends';
import { usePayerStore } from '@/stores/payer';
import { storeToRefs } from 'pinia';

const friendsStore = useFriendsStore();
const friendsList = friendsStore.friendsList;

const payerStore = usePayerStore();
const { payer } = storeToRefs(payerStore);

const payerId = ref<number | null>(null);
watch(payerId, value => {
  if (value) {
    payerStore.updatePayer(value);
  }
});
onMounted(() => {
  payerId.value = payer.value.id;
});
</script>

<style lang="scss">
.selector {
  background: var(--bg-dark);
  border-radius: var(--border-radius);
  border: 1px solid #ffffff;
  color: var(--text-white);
  font-size: var(--space-sm);
  height: 23px;
}
</style>
