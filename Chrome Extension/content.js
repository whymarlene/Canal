
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   const re = new RegExp('bear', 'gi')
   const matches = document.documentElement.innerHTML.match(re)
   if (matches == null) {
    sendResponse({count:0})
   } else {
    sendResponse({count: matches.length})
   }
})
