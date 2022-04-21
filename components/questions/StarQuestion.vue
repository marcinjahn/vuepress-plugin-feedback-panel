<template>
  <div class="container">
    <div class="question">{{ questionText }}</div>
    <div class="stars-container">
      <img
        v-for="n in 5"
        :key="n"
        v-on:click="rate(n)"
        class="star-img"
        :src="hover >= n ? filledStar : emptyStar"
        :data-star-number="n"
        @mouseover="hover = n"
        @mouseleave="hover = null"
      />
    </div>
    <div v-if="!!this.$slots.default" class="slot">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import filledStar from "../../assets/star-filled.svg";
import emptyStar from "../../assets/star-empty.svg";

export default {
  name: "StarQuestion",
  props: ["questionText", "questionNumber"],
  data() {
    return {
      filledStar,
      emptyStar,
      hover: null,
    };
  },
  methods: {
    rate: function (rating) {
      this.$emit("answered", rating);
    },
  },
};
</script>

<style scoped>
.stars-container {
  width: 175px;
  margin: 0 auto;
  margin-bottom: 30px;
}

.star-img {
  height: 2em;
  width: 2em;
  cursor: pointer;
}

.question {
  margin-bottom: 20px;
  font-weight: 400;
}

.stars-container {
  display: flex;
  justify-content: center;
  cursor: pointer;
  gap: 5px;
}

.slot {
  margin-top: 20px;
}
</style>
