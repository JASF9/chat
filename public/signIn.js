import {auth,db} from "./firebase.js"

var emailField = document.getElementById('mail');
var passwordField = document.getElementById('password');
var mistakes = document.getElementById('mistakes');
var signIn = document.getElementById('signIn');


auth.onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
  } else {
    // No user is signed in.
  }
});

export function signInFunction() {
  let email = emailField.value;
  let password = passwordField.value;

  auth.signInWithEmailAndPassword(email,password)
  .then(()=>{
    console.log('You have Signed In');
    window.location.href = "userpage.html";
  })
  .catch(error =>{
    console.error(error);
    if(email!="" && password!="")
    mistakes.innerHTML = error;
  });
}

signIn.addEventListener('click',signInFunction());


