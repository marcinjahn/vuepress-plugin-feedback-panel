<template>
  <div>
    <div class="feedback-panel-button" v-on:click="revealClicked" ref="feedbackButton">
      <span class="feedback-panel-content">{{options.buttonText}}</span>
    </div>
    <!-- <transition name="reminder">
      <Reminder v-if="isReminderOpen" style="transition: all 0.5s;">
        We would love to hear your feedback and learn about your experience.
        What could we improve?
      </Reminder>
    </transition> -->
    <div>
      <transition name="feedback-panel">
        <div v-if="isPanelOpen" class="feedback-panel-dialog-container">
          <div v-on:click="revealClicked" class="feedback-panel-close-btn">
            <span>+</span>
          </div>
          <div
            class="feedback-panel-question-container"
            v-if="question !== null"
          >
            <component
              v-bind:is="question.component"
              v-bind:questionText="question.questionText"
              @answered="answerProvided"
            >
              <div class="feedback-panel-additional-buttons">
                <div class="feedback-panel-btn-back">
                  <button
                    v-if="!question.isFirst && question.canBack"
                    @click="previousQuestion"
                    class="feedback-panel-btn-feedback"
                  >
                    Back
                  </button>
                </div>
                <div class="feedback-panel-btn-skip" v-if="question.skippable">
                  <button @click="skip" class="feedback-panel-btn-feedback">
                    Skip
                  </button>
                </div>
              </div>
            </component>

            <Stepper
              class="feedback-panel-stepper"
              :total="totalQuestions"
              :current="question.questionNumber"
            />
          </div>

          <div v-else class="feedback-panel-last-view">
            Thanks for your feedback. It helps us to make our website better!
            <div class="feedback-panel-loading">
              <img
                class="feedback-panel-loading"
                v-if="sendingInProgress"
                :src="require('../assets/loading.gif')"
              />
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import Reminder from "./Reminder.vue";
import Stepper from "./Stepper.vue";
import StarQuestion from "./questions/StarQuestion.vue";
import OpenQuestion from "./questions/OpenQuestion.vue";
import BinaryQuestion from "./questions/BinaryQuestion.vue";
import { sendWithRegistration, sendBasic } from "../scripts/feedbackSender";
import {
  isPanelOpen,
  isReminderOpen,
  mutations,
} from "../scripts/feedbackStore";
import { isWorthSubmitting } from "../scripts/generalUtils";
import options from "../config";
// import c from "../config";
// import { getCache, removeCache, setCache } from "../scripts/cacheUtils";
// import consts from "../consts";

let getFirstQuestion;
let getNextQuestion;
let getPreviousQuestion;

export default {
  name: "FeedbackPanel",

  components: {
    Reminder,
    Stepper,
    StarQuestion,
    OpenQuestion,
    BinaryQuestion
  },

  created() {
    // Workaround for a weird behaviour where data() part is executed before the created() hook - init() has to be invoked before the other functions!
    import("../scripts/questions").then((m) => {
      getFirstQuestion = m.getFirstQuestion;
      getNextQuestion = m.getNextQuestion;
      getPreviousQuestion = m.getPreviousQuestion;

      m.init();
      this.question = getFirstQuestion();
      this.totalQuestions = m.getTotalAmount();
    });
  },

  data() {
    return {
      question: null,
      answers: [],
      sendingInProgress: false,
      totalQuestions: 0,
      feedbackSubmitted: false,
      options: options.config
    };
  },

  computed: {
    isPanelOpen: isPanelOpen,
    isReminderOpen: isReminderOpen,
  },

  methods: {
    // enableShakyButton() {
    //   setInterval(() => {
    //     if (this.isOpen || this.feedbackSubmitted) return;

    //     const classList = this.$refs.feedbackButton.classList;
    //     classList.add("shaky");
    //     setTimeout(() => {
    //       classList.remove("shaky");
    //     }, 1000);
    //   }, c.config.buttonShakeIntervalInSeconds * 1000);
    // },

    revealClicked: function() {
      mutations.toggleIsPanelOpen();

      if (this.isPanelOpen) {
        mutations.setIsReminderOpen(false);
      }

      if (!this.isPanelOpen && this.answers.length !== 0) {
        this.submitResults();
        this.reset();
      }
    },

    answerProvided: async function(answer) {
      if (answer !== null) {
        this.answers.push({
          question: this.question.questionText,
          answer,
          questionId: this.question.id,
        });
      }

      this.question = getNextQuestion(answer);

      if (this.question === null) {
        await this.submitResults();
      }
    },

    skip: async function() {
      this.question = getNextQuestion();

      if (this.question === null) {
        await this.submitResults();
      }
    },

    previousQuestion: function() {
      if (!this.isFirst) {
        this.question = getPreviousQuestion();
        this.answers.pop();
      }
    },

    submitResults: async function(quiet = false) {
      if (!quiet) this.sendingInProgress = true;

      try {
        await sendWithRegistration(this.answers);
        this.feedbackSubmitted = true;
      } catch (e) {
        console.error("Sending feedback failed ", e);
      }

      this.sendingInProgress = false;

      setTimeout(() => this.reset(500), 800);
    },

    reset: function(timeout = 0) {
      this.sendingInProgress = false;
      mutations.setIsPanelOpen(false);

      setTimeout(() => {
        this.question = getFirstQuestion();
        this.answers = [];
      }, timeout);
    },
    // async tryToSendFailedSubmissions() {
    //   const failedSubmissionsString = getCache(consts.failedFeedbackCacheName);
    //   if (failedSubmissionsString === null) {
    //     return;
    //   }
    //   console.log("Trying to resend failed feedback submissions");
    //   let isOk = true;
    //   const fails = JSON.parse(failedSubmissionsString);
    //   await fails.submissions.reverse().forEach(async (feedback, i, array) => {
    //     const freshCache = JSON.parse(getCache(consts.failedFeedbackCacheName));
    //     freshCache.submissions.splice(array.length - 1 - i, 1);
    //     setCache(consts.failedFeedbackCacheName, freshCache);
    //     isOk = isOk && (await sendBasic(feedback));
    //   });

    //   if (isOk) {
    //     removeCache(consts.failedFeedbackCacheName);
    //   }
    // },
  },
};
</script>

<style>
.feedback-panel-button {
  position: fixed;
  right: 7rem;
  bottom: 1.3rem;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.5s, background-color 0.5s;
  z-index: 1001;
  background-color: #006aff;
}

.feedback-panel-dialog-container {
  /* Fixes code blocks overlap */
  z-index: 1003;

  position: fixed;
  right: 3rem;
  bottom: 4rem;
  background-color: white;
  border: 1px solid #dedede;
  border-radius: 10px;
  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  transition: transform 0.5s, box-shadow 0.5s;
  overflow: auto;
  width: 25rem;
  max-height: 30rem;
  /* height: 20rem; */
}

.feedback-panel-enter-active,
.feedback-panel-leave-active {
  transform: translateY(0rem);
}

.feedback-panel-enter,
.feedback-panel-leave-to {
  transform: translateY(30rem);
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.75);
}

/* .reminder-enter-active,
.reminder-leave-active {
  opacity: 1 !important;
}

.reminder-enter,
.reminder-leave-to {
  opacity: 0 !important;
} */

.feedback-panel-question-container {
  margin: 2.5rem;
}

.feedback-panel-content {
  color: white;
  font-weight: 500;
}

.feedback-panel-loading {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.feedback-panel-loading img {
  width: 50px;
}

.feedback-panel-stepper {
  position: absolute;
  bottom: 1em;
  right: 0;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
}

.feedback-panel-btn-feedback {
  background-color: #bbbbbb;
  border: 2px solid #ffffff00;
  color: #1f1f1f;
  min-width: 56px;
  padding: 5px 10px;
  border-radius: 5px;
  font-family: inherit;
  cursor: pointer;
}

.feedback-panel-btn-feedback:hover {
  background-color: #cccccc;
}

.feedback-panel-btn-feedback:active {
  background-color: #cccccc;
}

.feedback-panel-btn-skip {
  display: flex;
  justify-content: flex-end;
}

.feedback-panel-btn-back {
  display: flex;
  justify-content: flex-start;
}

.feedback-panel-last-view {
  padding: 2em;
}

.feedback-panel-close-btn {
  position: absolute;
  right: 10px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  margin: 10px 5px;
  border-radius: 50%;
  text-align: center;
  font-weight: 700;
  line-height: 28px;
  font-size: 25px;
  transform: rotate(45deg);
}

.feedback-panel-additional-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1em;
}

.feedback-panel-shaky {
  animation: shake 1s cubic-bezier(0.36, 0.07, 0.19, 0.97) both infinite;
  transform: translate3d(0, 0, 0);
  transform: scale(1);
}

@keyframes feedback-panel-shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }
  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }
  30%,
  50%,
  70% {
    transform: translate3d(-10px, 0, 0);
  }
  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>
