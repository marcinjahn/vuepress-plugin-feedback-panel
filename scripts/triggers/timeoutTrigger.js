import { mutations, isPanelOpen } from '../feedbackStore'
import c from '../../config'
import { isLocalStorageSupported, isExpired, getCache } from '../cacheUtils';
import { isRunningLocally } from '../generalUtils';
import consts from '../../consts';


export function setupTimeoutTrigger() {
  if (!isLocalStorageSupported() || (c.config.disableOnLocalhost && isRunningLocally())) {
    return;
  }

  setTimeout(requestFeedback, c.config.timeoutTriggerSeconds * 1000);
}

function requestFeedback() {
  const cache = getCache(consts.feedbackKeyName);
  if ((cache === null || isExpired(cache)) && !isPanelOpen()) {
    mutations.setIsReminderOpen(true);
  }
}