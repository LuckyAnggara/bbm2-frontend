<template>
  <div :id="id">
    <div
      v-if="state.files.length > 0"
      class="flex flex-col p-2 w-full border-2 border-gray-300 border-dashed rounded-lg h-fit bg-gray-200 dark:bg-gray-600 dark:border-gray-600"
    >
      <div v-for="(file, index) in state.files" :key="index" class="flex flex-row justify-center space-x-2 text-sm">
        <span>{{ ++index }}</span> .
        <span class="w-10/12">{{ file.name }}</span>
        <span class="cursor-pointer text-red-500 hover:scale-105 duration-300 ease-in-out" @click="handleClickDeleteFile(index)"
          ><TrashIcon class="ml-2 w-5 h-5"
        /></span>
      </div>
    </div>
    <div v-else class="flex items-center justify-center w-full" v-bind="getRootProps()">
      <label
        for="dropzone-file"
        class="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
      >
        <div class="flex flex-col items-center justify-center pt-5 pb-6">
          <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
        </div>
        <input v-bind="getInputProps()" />
      </label>
    </div>
  </div>
</template>

<script setup>
import { useDropzone } from 'vue3-dropzone'

import { reactive, watch } from 'vue'
import { TrashIcon } from '@heroicons/vue/24/outline'

const props = defineProps({
  id: String,
})

const state = reactive({
  files: [],
})
const { getRootProps, getInputProps, isDragActive, ...rest } = useDropzone({
  onDrop,
})

watch(state, () => {
  console.log('state', state)
})
watch(isDragActive, () => {
  console.log('isDragActive', isDragActive.value, rest)
})
function onDrop(acceptFiles, rejectReasons) {
  console.log(acceptFiles)
  console.log(rejectReasons)
  state.files = acceptFiles
}

function handleClickDeleteFile(index) {
  state.files.slice(index, -1)
}
</script>
