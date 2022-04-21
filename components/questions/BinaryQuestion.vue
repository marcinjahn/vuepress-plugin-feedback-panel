<template>
  <div class="container">
    <div class="question">{{ questionText }}</div>
    <div class="answers">
      <span class="answer" @click="answer(true)">
        <div class="answer-icon">
          <!-- <img
            src="../../assets/like-picto.svg"
            height="28px"
            alt="feedback-icon"
          /> -->
          <!-- <svg height="28px" width="28px">
            <use href="../../assets/like-picto.svg#ok"></use>
          </svg> -->
        </div>
        <span class="answer-text">Yes</span>
      </span>
      <span class="answer" @click="answer(false)">
        <div class="answer-icon answer-no">
          <!-- <img
            src="../../assets/like-picto.svg"
            height="28px"
            alt="feedback-icon"
          /> -->
          <!-- <svg height="28px" width="28px">
            <use href="../../assets/like-picto.svg#ok"></use>
          </svg> -->
        </div>
        <span class="answer-text">No</span>
      </span>
    </div>
    <div v-if="!!this.$slots.default" class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BinaryQuestion",
  props: ["questionText", "questionNumber"],
  methods: {
    answer: function (choice) {
      this.$emit("answered", choice);
    },
  },
};
</script>

<style lang="stylus" scoped>
.question {
  margin-bottom: 20px;
  font-weight: 400;
}

.answers {
  display: flex;
  justify-content: space-around;
  margin-top: 35px;
  margin-bottom: 40px;
}

.answers div {
  font-size: 1.4em;
  transition: font-size 0.1s;
}

.slot {
  margin-top: 20px;
}

.answer {
  color: #888888;
  font-size: 1.1em;
  font-weight: 200;
  cursor: pointer;
}

.answer:hover {
  color: #2c3e50 !important;
}

// .answer:hover svg {
//   fill: #262626;
// }

// .answer-icon {
//   fill: #262626;
// }

.answer-text {
  font-weight: 500;
}

.answer-text:hover {
  color: #262626;
  font-weight: 500;
}
</style>