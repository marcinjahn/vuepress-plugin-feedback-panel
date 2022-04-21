<template>
  <div class="reminder-container" role="tooltip">
    <div class="arrow" >
      <svg viewBox="0 0 32 16" style="">
        <path d="M16 0l16 16H0z" fill="currentcolor"></path>
      </svg>
    </div>
    <div style="background: white; padding: 20px;" @click="popupClicked">
      <div>
        <div class="close-btn" @click="closeClicked">
          <span>+</span>
        </div>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mutations } from "../scripts/feedbackStore";

export default {
  methods: {
    closeClicked(event) {
      event?.stopPropagation();
      mutations.setIsReminderOpen(false);
    },
    popupClicked() {
      this.closeClicked();
      mutations.setIsPanelOpen(true);
    }
  },
};
</script>

<style scoped>
.reminder-container {
  position: fixed;
  right: 3rem;
  bottom: 5rem;
  z-index: 1002;
  border: 1px solid rgb(235, 235, 235);
  box-shadow: rgba(0, 0, 0, 0.35) 0px 6px 12px;
  pointer-events: auto;
  width: 15rem;
  cursor: pointer;
}

.reminder-container .arrow {
  position: absolute;
  height: 8px;
  width: 16px;
  background: transparent;
  color: rgb(255, 255, 255);
  z-index: -1;
  transform: rotate(180deg) translateX(50%);
  top: 100%;
  left: 50%;
}

.reminder-container .arrow svg {
  position: absolute;
  stroke-width: 2px;
  border-top: 1px solid transparent;
  color: rgb(255, 255, 255);
  stroke: rgb(235, 235, 235);
}

.close-btn {
  position: absolute;
  right: 1px;
  top: 1px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  text-align: center;
  font-weight: 300;
  color: #262626;
  line-height: 28px;
  font-size: 25px;
  transform: rotate(45deg);
}
</style>
