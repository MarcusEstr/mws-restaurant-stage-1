
//Attempt to register Service Worker in browser.
if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js').then(function(reg) {
    console.log("Service Worker registered.");
  }).catch((e) => {
    console.log("Service Worker not registered.", e);
  });
}