import FeedbackPanel from "./components/FeedbackPanel.vue";
// import { setupSpecificPagesTrigger } from './scripts/triggers/specificPagesTrigger.js'
// import { setupTimeoutTrigger } from "./scripts/triggers/timeoutTrigger";
import defaultOptions from "./config";
import userOptions from '@dynamic/feedbackPanelPluginOptions'

export default ({ Vue, router }) => {
  configure();
  addComponent(Vue);

  // Feedback panel will not open itself automatically for now
  // That may be enabled in the future
  // setupSpecificPagesTrigger(router);
  // setupTimeoutTrigger();
};

function addComponent(vue) {
  vue.component("FeedbackPanel", FeedbackPanel);
}

export function configure() {
  defaultOptions.config = { ...defaultOptions.config, ...userOptions };
}
