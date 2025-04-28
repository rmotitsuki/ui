import { defineStore } from "pinia";

export const useToolbarStore = defineStore("toolbar", {
  state: () => {
    return {
      toolbarItems: [],
      current: 0
    };
  },
  actions: {
    addIconTooltip(icon, tooltip) {
        this.toolbarItems[this.current].icon = icon;
        this.toolbarItems[this.current].tooltip = tooltip;
        this.current++;
    },
  }
});