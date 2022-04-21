import c from '../config'


export function isLocalStorageSupported() {
    try {
        const storage = window['localStorage'];
        storage.setItem("test", "test");
        storage.removeItem("test");
        return true;
    } catch (err) {
        return false;
    }
}

export function isExpired(feedbackCache) {
    if (feedbackCache === null) return true;
    
    const timestamp = JSON.parse(feedbackCache).timestamp;
    if (getMinutes(new Date().getTime() - timestamp) < c.config.noAutoFeedbackMinutes) {
        return false;
    }

    return true;
}

export function getCache(keyName) {
    return localStorage.getItem(keyName)
}

export function setCache(keyName, valueObject) {
    localStorage.setItem(keyName, JSON.stringify(valueObject))
}

export function removeCache(keyName) {
    localStorage.removeItem(keyName);
}

function getMinutes(miliseconds) {
    return miliseconds / 60000
}