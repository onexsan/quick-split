<template>
  <van-form class="calc-form" @submit="onSubmit">
    <van-cell-group inset>
      <van-field
        v-model.number="sum"
        name="Sum"
        label="Sum"
        left-icon="points"
        type="number"
        placeholder="Sum to split"
        :rules="[{ required: true, message: 'Sum is required' }]"
      />
      <van-field
        v-model.number="friends"
        left-icon="friends-o"
        type="number"
        name="Friends"
        label="Friends"
        placeholder="Number of friends involved"
        :rules="[{ required: true, message: 'Number of friends is required' }]"
      />
      <van-field
        v-if="includeTip"
        v-model.number="tip"
        left-icon="like-o"
        type="number"
        name="Tip"
        label="Tip"
        :formatter="tipFormatter"
        format-trigger="onBlur"
        placeholder="Tip (percent)"
      />
    </van-cell-group>
    <div class="group-wrapper">
      <van-checkbox
        class="checkbox"
        v-model="includeTip"
        shape="square"
        checked-color="#F5A623"
      >
        Include tip
      </van-checkbox>
    </div>
    <div class="group-wrapper">
      <van-button round block type="primary" native-type="submit">
        Submit
      </van-button>
      <template v-if="result">
        <br/>
        <van-cell-group inset>
          <van-field v-model="result" readonly center label="Result" placeholder="Result">
            <template #button>
              <van-button size="small" type="primary" @click="copyToClipboard">Copy</van-button>
            </template>
          </van-field>
        </van-cell-group>
      </template>
    </div>
  </van-form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useSplit from '@/composables/useSplit'

const sum = ref<number | undefined>(undefined);
const friends = ref<number | undefined>(undefined);
const tip = ref<number | undefined>(undefined);
const includeTip = ref<boolean>(false);
const tipFormatter = (value: number | string) => value ? `${value}%` : ''
const result = ref<number | null>(null)

const onSubmit = () => {
  if (sum.value && friends.value) {
    const split = useSplit({sum: sum.value, divideBy: friends.value, tip: tip.value})
    result.value = split
  }
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(`${result.value} per person`)
}
</script>
