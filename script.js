//firebase initialize
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

var firebaseConfig2 = {
    apiKey: "AIzaSyDLtxioM5OfiO7zLj85eFuLI1mTAyatkvo",
    authDomain: "tagwss.firebaseapp.com",
    databaseURL: "https://tagwss.firebaseio.com",
    projectId: "tagwss",
    storageBucket: "tagwss.appspot.com",
    messagingSenderId: "830323140826",
    appId: "1:830323140826:web:075b9925d7311a25425de3",
    measurementId: "G-L9FMFLMBWD"
  };
  // Initialize Firebase1
  firebase.initializeApp(firebaseConfig);

  // Initialize Firebase2
  var secondaryApp = firebase.initializeApp(firebaseConfig2, "secondary");


//auth and firestore references
const auth = firebase.auth();
const profileRef = firebase.database().ref('profiles');
const auth2 = secondaryApp.auth();
const tagRef = secondaryApp.database().ref('tags');


//listen for auth status changes
auth.onAuthStateChanged(user => {
    if (user) {

        var userId = firebase.auth().currentUser.uid;

        console.log('user logged in: ', user);

        profileRef.on('value', function(snapshot) {

            snapshot.forEach(function(childSnapshot) {
                var childData = childSnapshot.val();

                if (userId === childSnapshot.key) {
                    //load data into text input
                    document.getElementById('bname').value = childData.name;
                    document.getElementById('website').value = childData.website;
                    document.getElementById('phone').value = childData.phone;
                    document.getElementById('prods').value = childData.prods;
                    document.getElementById('about').value = childData.about;

                    convertURIToImageData(childData.pic).then(function(imageData) {
                        // Here you can use imageData
                        document.getElementById('image-preview').src = imagedata_to_image(imageData);

                    });

                    addTags();
                }
            });
        });

    } else {
        console.log('user logged out');
    }
});

//listen for profile form submit
const profileForm = document.querySelector('#profile_form');

if (profileForm) {
    profileForm.addEventListener('submit', (e) => {
        e.preventDefault();

        if (auth != null) {
            //get values
            var name = getInputVal('bname');
            var website = getInputVal('website');
            var phone = getInputVal('phone');

            // ONLY TAKES FIRST SELECTION
            var prods = getInputVal('prods');

            var about = getInputVal('about');

            //update profile
            updateProfile(name, website, phone, prods, about, uri);

            alert("Your changes have been saved!");
        }

    });
}

//get form values
function getInputVal(id) {
    return document.getElementById(id).value;
}

//save profile data to firebase
function saveProfile(name, website, phone, prods, about, pic) {
    // const newProfileRef = profileRef.push();
    // newProfileRef.set({
    //     name: name,
    //     website: website,
    //     phone: phone,
    //     prods: prods,
    //     about: about,
    //     id: id
    // });

    var userId = firebase.auth().currentUser.uid;
    let userRef = firebase.database().ref('profiles');
    userRef.child(userId).set({'name': name, 'website': website, 'phone': phone,
        'prods': prods, 'about': about, 'pic': pic});
}

function updateProfile(name, website, phone, prods, about, pic) {

    var userId = firebase.auth().currentUser.uid;

    profileRef.child(userId).update({
        'name': name,
        'website': website,
        'phone': phone,
        'prods': prods,
        'about': about,
        'pic': pic
    });

    addTags();

    // profileRef.on('value', function(snapshot) {
    //
    //     snapshot.forEach(function(childSnapshot) {
    //         console.log('im here');
    //         var childData = childSnapshot.val();
    //         // console.log('child', childData);
    //         if (userId === childData.id) {
    //             //load data into text input
    //
    //         }
    //     });
    // });
}


//add tags to second database
function addTags() {
    var tags = document.getElementById('prods').value.split(", ");

        tags.forEach(function(tag) {
            let tagRef = secondaryApp.database().ref('tags');
            tagRef.child(tag).set({'tag': tag, 'business': document.getElementById('bname').value});
        });

}




//sign up
const signUpForm = document.querySelector('#signUpForm');

if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //get user infor
        const email = signUpForm['emailAddress'].value;
        const password = signUpForm['password'].value;
        const reEnter = signUpForm['reEnterPassword'].value;
        const business = signUpForm['nameOfBusiness'].value;

        if (password !== reEnter) {
            alert('Your passwords do not match!');
            return;
        }

        //sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            //brings users to the profile page
            saveProfile(business, '', '', '', '', '', '');
            window.location.href = "profile.html";
        }).catch(function(error) {

            //*****ALERTS AREN"T SHOWING UP

            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;

            if (errorCode === 'auth/invalid-email') {
                alert(errorMessage);
            } else if (errorCode === 'auth/user-not-found') {
                alert(errorMessage);
            } else if (errorCode === 'auth/email-already-in-use') {
                alert(errorMessage);
            }
            console.log(error);

        });
    })
}


//logout
const logout = document.querySelector('#signOut');

if (logout) {
    logout.addEventListener('click', (e) => {
        e.preventDefault();
        auth.signOut().then(() => {
            console.log('user signed out');

            //brings users to the home page
            window.location.href = "index.html";
        });
    });
}

//sign in
const signIn = document.querySelector('#signInForm');

if (signIn) {
    signIn.addEventListener('submit', (e) => {
        e.preventDefault();

        //get user info
        const email = signIn['emailAddress'].value;
        const password = signIn['password'].value;

        auth.signInWithEmailAndPassword(email, password).then(cred => {
            console.log(cred.user);

            //brings users to the profile page
            window.location.href = "profile.html";

        })
    })
}

var uri = '';

var loadFile = function(event) {
    var image = document.getElementById('image-preview');
    image.src = URL.createObjectURL(event.target.files[0]);
};

function encodeImageFileAsURL(element) {
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
        console.log('RESULT', reader.result)
        uri = reader.result;
    }
    reader.readAsDataURL(file);
}

function convertURIToImageData(URI) {
    return new Promise(function(resolve, reject) {
        if (URI == null) return reject();
        var canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            image = new Image();
        image.addEventListener('load', function() {
            canvas.width = image.width;
            canvas.height = image.height;
            context.drawImage(image, 0, 0, canvas.width, canvas.height);
            resolve(context.getImageData(0, 0, canvas.width, canvas.height));
        }, false);
        image.src = URI;
    });
}

function imagedata_to_image(imagedata) {
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = imagedata.width;
    canvas.height = imagedata.height;
    ctx.putImageData(imagedata, 0, 0);

    var image = canvas.toDataURL();
    return image;
}