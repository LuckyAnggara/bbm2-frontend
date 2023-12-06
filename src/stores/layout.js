import { defineStore } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();

// ITEM STORE
export const useLayoutStore = defineStore("layoutStore", {
  state: () => {
    return {
      title: "",
      isRightDrawShow: false,
      isSideBarShow: true,
      component: null,
      event: {},
    };
  },
  getters: {},
  actions: {},
});
