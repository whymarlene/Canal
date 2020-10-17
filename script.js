//sign up
const signUpForm = document.querySelector('#signUpForm');

if (signUpForm) {
    signUpForm.addEventListener('submit', (e) => {
        e.preventDefault();

        //get user infor
        const email = signUpForm['emailAddress'].value;
        const password = signUpForm['password'].value;
        const reEnter = signUpForm['reEnterPassword'].value;

        if (password !== reEnter) {
            alert('Your passwords do not match!');
            return;
        }

        //sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(cred => {
            //brings users to the profile page
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

