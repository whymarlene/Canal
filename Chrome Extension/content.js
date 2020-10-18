var firebaseConfig = {
    apiKey: "AIzaSyB3yV7EU8a9AJSMdR2BxL_PJY2fzyfAr9c",
    authDomain: "weshallsee-904fd.firebaseapp.com",
    databaseURL: "https://weshallsee-904fd.firebaseio.com",
    projectId: "weshallsee-904fd",
    storageBucket: "weshallsee-904fd.appspot.com",
    messagingSenderId: "803911270744",
    appId: "1:803911270744:web:ba26f1106fff98d6f9652d",
    measurementId: "G-Y25XJEGD8M"
};

//firebase.initializeApp(firebaseConfig);


chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
   var tag = 'bear'
   const re = new RegExp(tag, 'gi')
   const matches = document.documentElement.innerHTML.match(re)
   if (matches == null) {
    sendResponse({count:0})
   } else {
    sendResponse({count: matches.length})
   }
})
