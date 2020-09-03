
var firebaseConfig = {
    apiKey: "AIzaSyDgY1_PcWY90_-gUfQTO51lkqdwD1LvqcU",
    authDomain: "chat-f9624.firebaseapp.com",
    databaseURL: "https://chat-f9624.firebaseio.com",
    projectId: "chat-f9624",
    storageBucket: "chat-f9624.appspot.com",
    messagingSenderId: "691343216054",
    appId: "1:691343216054:web:b0a9a3a994bb4888f14517"
  };
 firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore(); 

export{auth,db};