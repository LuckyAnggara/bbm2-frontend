<template>
  <Transition name="modal">
    <div>
      <div
        v-if="show"
        aria-hidden="true"
        class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-modal md:h-full modal-mask"
      >
        <div class="relative p-4 w-full max-w-lg h-full md:h-auto">
          <!-- Modal content -->
          <div class="relative p-4 bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            <!-- Modal header -->
            <div class="flex justify-between items-center pb-4 mb-4 rounded-t border-b sm:mb-5 dark:border-gray-600">
              <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Ganti Gambar Product / Service</h3>
              <button
                @click="emit('close')"
                type="button"
                class="text-gray-400 bg-transparent hover:bg-red-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-red-600 dark:hover:text-white"
              >
                <svg
                  aria-hidden="true"
                  class="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
            </div>
            <div>
              <div v-bind="getRootProps()">
                <div class="flex items-center justify-center w-full">
                  <label
                    for="dropzone-file"
                    class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div v-if="!isLoading" class="flex flex-col items-center justify-center pt-5 pb-6">
                      <CloudArrowUpIcon class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                      <div v-if="isDragActive">
                        <p class="mb-2 text-sm text-gray-400 dark:text-gray-400">
                          <span class="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                      <div v-else>
                        <p>Drag 'n' drop some files here, or click to select files</p>
                      </div>
                    </div>
                    <div v-else class="w-1/2 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                      <div class="bg-blue-600 h-2.5 rounded-full" style="width: 100%"></div>
                      <span class="italic block text-center text-xs mt-2">uploading file..</span>
                    </div>
                    <input v-bind="getInputProps()" />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from "vue";
import { useDropzone } from "vue3-dropzone";
import { CloudArrowUpIcon } from "@heroicons/vue/24/outline";
import { useItemStore } from "@/stores/items";
import axiosFile from "@/services/axiosFile";

const { getRootProps, getInputProps, isFocused, isDragReject, open } = useDropzone({ onDrop });

const emit = defineEmits(["close", "changeImage"]);

const isDragActive = ref(true);
const itemStore = useItemStore();
const props = defineProps({
  show: Boolean,
});

const response = ref(null);

const isLoading = ref(false);
const uploadProgress = ref(0);

function onDrop(acceptFiles, rejectReasons) {
  saveFiles(acceptFiles[0]);
}

const saveFiles = async (files) => {
  let formData = new FormData();
  formData.append("file", files);
  formData.append("id", itemStore.singleResponses.id);
  isLoading.value = true;
  uploadProgress.value = 0;

  try {
    response.value = await axiosFile.post("item/upload-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: function (progressEvent) {
        uploadProgress.value = parseInt(Math.round((progressEvent.loaded / progressEvent.total) * 100));
      }.bind(this),
    });
  } catch (error) {
    alert(error.error.message);
  } finally {
    isLoading.value = false;
    emit("changeImage", response.value.data.data);
  }
  isLoading.value = false;
};
</script>
