<template>
  <div @click="edit">
    <label v-if="!isEdit" class="cursor-text"> {{ datadata }}</label>
    <input
      v-else
      @focusout="isEdit = false"
      :type="type"
      ref="input"
      class="w-32 bg-gray-500 border border-gray-800 text-md rounded-lg p-2 text-white font-medium"
      v-model="datadata"
    />
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const props = defineProps({
  data: Number,
  type: String,
})

const datadata = ref(props.data)

const input = ref(null)
const isEdit = ref(false)

async function edit() {
  isEdit.value = !isEdit.value
  await nextTick()
  input.value.focus()
}
</script>
