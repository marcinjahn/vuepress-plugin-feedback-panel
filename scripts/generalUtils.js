export function isRunningLocally() {
  const currentUrl = window.location.href;
  if (currentUrl.startsWith("http://localhost")) return true;
  else return false;
}
