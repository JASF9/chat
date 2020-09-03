import {auth,db} from "./firebase.js"

var nickField = document.getElementById('nick');
var infoField = document.getElementById('info');
//const imageField = document.getElementById('image');
var chatSpace = document.getElementById('chats');
var chatPage = document.getElementById('chatpage');
var newChat = document.getElementById('newChat');
var mistakes = document.getElementById('mistakes');

//import {firebaseApp} from './firebase'

//const auth = firebase.auth();



const usersRef = db.collection("Users")
const chatRef = db.collection("Chats");

function loadUser()  {
    usersRef.where("email","==",auth.currentUser.email).get().then(snapshot =>{
        if(snapshot.empty){
          mistakes.innerHTML = "Expired session. Please login again.";
        }
        else{
            nickField.innerHTML = snapshot.nick;
            var info = "<img src=" + snapshot.image + " width='200' height='200'><br>";
            info = info + "<p> Name: " + snapshot.name + "</p><br>";
            info = info + "<p> Nick: " + snapshot.nick + "</p><br>";
            info = info + "<p> email: " + snapshot.email + "</p><br>";
            infoField.innerHTML = info;
            loadChats();
        }
    })
}

function createChat() {
    usersRef.where("email","==",auth.currentUser.email).get().then(snapshot =>{
        if(snapshot.empty){
          mistakes.innerHTML = "Expired session. Please login again.";
        }
        else{
            let u1 = snapshot.nick;
            let u2 = userField.value;
            chatRef.doc().set({
            users: [u1,u2],
            messages: []
            });
            window.location.href = "userpage.html";
        }
    })
}
newChat.addEventListener('click',createChat());

function loadChats() {
    usersRef.where("email","==",auth.currentUser.email).get().then(snapshot =>{
        if(snapshot.empty){
          mistakes.innerHTML = "Expired session. Please login again.";
        }
        else{
            chatRef.get().then(snapshots =>{
                var chats = [];
                snapshots.forEach(snap => {
                    if(snap.users[0]==snapshot.nick){
                        chats.push(snap)
                    }
                    if(snap.users[1]==snapshot.nick){
                        chats.push(snap)
                    }
                });
                var hc = "";
                chats.forEach(c =>{
                    var n ;
                    if(c.users[0]==snapshot.nick){
                        n = c.users[0]
                    }
                    else{
                        n = c.users[1]
                    }
                    hc = hc + "<div class='chat' onclick=loadMessages("+c.id+")><h2>Chat with "+n+"</h2><p>"+ c.messages[(Object.keys(messages).length-1)].sender + ": "+c.messages[(Object.keys(messages).length-1)].content +"</p></div>";
                })
                chatPage.style.visibility = "hidden";
                chatSpace.innerHTML = hc;
                chatSpace.style.visibility = "visible";
            })
            .catch(error =>{
                console.error(error);
                mistakes.innerHTML = error;
              });
        }
    })
}


function addMessage(chatid) {
    usersRef.where("email","==",auth.currentUser.email).get().then(snapshot =>{
        if(snapshot.empty){
          mistakes.innerHTML = "Expired session. Please login again.";
        }
        else{
         text = document.getElementById('content').value;
         chatRef.where("id","==",chatid).get().then(snaps =>{
             if(snaps.empty){
                 mistakes.innerHTML = "Error sending message to chat."
             }
             else{
                 var nick;
                 if(snaps.users[0]==snapshot.nick){
                    nick = snaps.users[1]
                 }
                 else{
                    nick = snaps.users[0] 
                 }
                 var messageToSend = {
                     sender: snapshot.nick,
                     receiver: nick,
                     content: text,
                     date: Date.now()
                 }
                 snaps.messages.push(messageToSend)

                 chatRef.doc(chatid).update({
                     users: snaps.users,
                     messages: snaps.messages
                 })
                 loadMessages(chatid);
             }
         })
        }
    })
}


function loadMessages(chatid) {
    usersRef.where("email","==",auth.currentUser.email).get().then=(snapshot =>{
        if(snapshot==null){
          mistakes.innerHTML = "Expired session. Please login again.";
        }
        else{
            chatRef.where("id","==",chatid).get().then(snaps =>{
                if(snaps==null){
                    mistakes.innerHTML = "Error loading chat."
                }
                else{
                    var hc = "<button onclick=loadChats()>Go Back</button>"
                    snaps.messages.forEach(m => {
                        hc = hc + "<div class=message><p>"+ m.sender +"</p><br><p>"+ m.content + "</p><br><p>" + m.date + "</p></div>";
                    });
                    hc = hc + "<div class='searcher><input id='content'><button id='button' onclick='addMessage("+chatid+")>Send</button></div>"
                    chatSpace.style.visibility = "hidden";
                    chatPage.innerHTML = hc;
                    chatPage.style.visibility = "visible";
                    //move to bottom?
                }
            })                                                                                                                                     
        }
    })
}
