import { setCache, getCache } from "./cacheUtils";
import { isRunningLocally } from "../scripts/generalUtils";
import c from "../config";
import consts from "../consts";

async function sendWithRegistration(answers) {
  registerFeedbackSubmission();

  if (answers.length === 0) {
    return;
  }

  const feedback = {
    answers,
    timestamp: new Date().toISOString(),
    siteUrl: window.location.href,
  };

  await sendBasic(feedback);
}

async function sendBasic(feedback) {
  if (c.config.disableOnLocalhost && isRunningLocally()) {
    console.log("Submitting feedback from localhost is disabled. Ignoring");
    return;
  }

  console.log(feedback);

  try {
    const httpResponse = await fetch(c.config.submissionWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback),
      // credentials: "include",
    });

    if (!httpResponse.ok) {
      throw new Error('Feedback submission failed with error code ', httpResponse.status);
    }
    return true;
  } catch (e) {
    console.log("Feedback submission failed.");
    console.log(e)
    return false;
  }
}

// function cacheFailedSubmission(feedback) {
//   const cacheString = getCache(consts.failedFeedbackCacheName);
//   if (cacheString === null) {
//     var cache = { submissions: [] };
//   } else {
//     var cache = JSON.parse(cacheString);
//   }
//   cache.submissions.push(feedback);
//   setCache(consts.failedFeedbackCacheName, cache);
// }

function registerFeedbackSubmission() {
  const newCache = {
    timestamp: new Date().getTime(),
  };
  setCache(consts.feedbackKeyName, newCache);
}

export { sendWithRegistration, sendBasic };
