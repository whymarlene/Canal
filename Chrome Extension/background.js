//const words = {}

//chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//  words[request.url] = request.count
//})

window.bears = {}
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  window.bears[request.url] = request.count
})

chrome.browserAction.onClicked.addListener(function (tab) {
  chrome.tabs.create({url: 'popup.html'})
})