import {auth,db} from "./firebase.js"

var nameField = document.getElementById('name');
var emailField = document.getElementById('mail');
var nickField = document.getElementById('nick');
var passwordField = document.getElementById('password');
var imageField = document.getElementById('image');
var signUp = document.getElementById('signUp');
var mistakes = document.getElementById('mistakes');

//const auth = firebase.auth();
const db = firebase.firestore();


const usersRef = db.collection('Users');

function signUpFunction() {
  console.log('started function')
  let name = nameField.value;
  let email = document.getElementById('mail').value;
  let nick = document.getElementById('nick').value;
  let password = document.getElementById('password').value;
  let image = imageField.value;

  usersRef.where("nick","==",nick).get().then(snapshot =>{
    if(!snapshot.empty){
      console.log("snapshot not null")
      mistakes.innerHTML = "Nickname already in use";
    }
    else{
      auth.createUserWithEmailAndPassword(email,password)
      .then(()=>{
        console.log('Signed Up Successfully');
    
        usersRef.doc().set({
          name: name,
          email: email,
          nick: nick,
          password: password,
          image: image
        });

        window.location.href = "index.html";
      })
      .catch(error =>{
        console.error(error);
        if(name!=""&&email!="")
        mistakes.innerHTML = error;
      });
    }
  })
}

signUp.addEventListener('click',signUpFunction());

