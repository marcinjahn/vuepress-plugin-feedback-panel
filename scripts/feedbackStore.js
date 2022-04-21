import Vue from "vue";

const state = Vue.observable({
  isPanelOpen: false,
  isReminderOpen: false,
});

export const isPanelOpen = () => state.isPanelOpen;
export const isReminderOpen = () => state.isReminderOpen;

export const mutations = {
  setIsPanelOpen: (val) => (state.isPanelOpen = val),
  toggleIsPanelOpen: () => (state.isPanelOpen = !state.isPanelOpen),
  setIsReminderOpen: (val) => (state.isReminderOpen = val),
};
