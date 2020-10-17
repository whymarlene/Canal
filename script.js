//Signing up
const signUpForm = document.querySelector('#signUpForm');

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

//logout
const logout = document.querySelector('#signOut');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        console.log('user signed out');
    });
});
