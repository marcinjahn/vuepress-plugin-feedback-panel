import { mutations, isPanelOpen } from '../feedbackStore'
import c from '../../config'
import { isLocalStorageSupported, isExpired, getCache } from '../cacheUtils';
import consts from '../../consts';


export function setupSpecificPagesTrigger(router) {
  if (!isLocalStorageSupported()) {
    return;
  }

  router.afterEach((newPage) => {
    requestFeedback(newPage.path)
  })
}

function requestFeedback(currentPage) {
  const cache = getCache(consts.feedbackKeyName);
  const pages = c.config.includePages
  if (pages.includes('*') || pages.includes(currentPage)) {
    if ((cache === null || isExpired(cache)) && !isPanelOpen()) {
      mutations.setIsReminderOpen(true);
    }
  }
}