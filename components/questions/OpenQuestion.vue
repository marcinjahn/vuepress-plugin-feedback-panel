<template>
  <div class="container">
    <div class="question">{{ questionText }}</div>
    <div class="text">
      <textarea rows=5 v-model="comment" placeholder="..."></textarea>
    </div>
    <div class="buttons">
      <slot></slot>
      <button @click="submit" class="feedback-panel-btn-feedback">Next</button>
    </div>

  </div>
</template>

<script>
export default {
  name: "StarQuestion",
  props: ["questionText","questionNumber"],
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    submit: function () {
      this.$emit("answered", this.comment === "" ? null : this.comment);
    },
  },
};
</script>

<style lang="stylus" scoped>
.question {
  word-wrap: break-word;
  margin-bottom: 20px;
  font-weight: 400;
}

.stars {
  display: flex;
  justify-content: space-around;
  cursor: pointer;
}

.buttons {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;  
}

button {
  margin-left: 10px;
}

textarea {
  resize:vertical;
  width: 100%;
}

// .btn-feedback {
//   background-color: #dbdbdb;
//   border: 2px solid #dbdbdb;
//   color: #1f1f1f;
//   min-width: 56px;
//   padding: 10px 20px;
//   border-radius:5px;
//   font-family: inherit;
//   cursor: pointer;
// }

// .btn-feedback:hover {
//   background-color: #bababa;
//   border-color: #bababa;
// }

// .btn-feedback:active {
//   background-color: #9f9f9f;
//   border-color: #9f9f9f;
// }
</style>