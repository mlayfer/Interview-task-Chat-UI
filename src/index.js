
//This is then entry point for your app. Do as you wish.

import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./components";
import io from "socket.io-client";

ReactDOM.render(<App />, document.getElementById("root"));

//connecting to Socket.IO chat server
const socket = io("https://spotim-demo-chat-server.herokuapp.com");

let currentAvatar = '';
let username = 'pikachu';
const avatars = [
  'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png',
  'https://spotim-demo-chat-server.herokuapp.com/avatars/005-bullbasaur.png'
];
const messages = [
  {
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
    username: 'pikachu',
    text: 'Pika Pika!'
  },
  {
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/002-psyduck.png',
    username: 'psyduck',
    text: 'Psy ay ayyyy'
  },
  {
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/001-snorlax.png',
    username: 'snorlax',
    text: 'Let me sleep you mothafuckers'
  },
  {
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/003-pikachu.png',
    username: 'pikachu',
    text: 'Pika Pika I said!!!!! bbbZZZZzzZZ'
  },
  {
    avatar: 'https://spotim-demo-chat-server.herokuapp.com/avatars/004-jigglypuff.png',
    username: 'jigglypuff',
    text: 'I will paint mustaches on all of your faces!! I swear!'
  }
];

socket.on("connect", function() {
  console.log("Connected to chat server!");
  console.log('Socket Id:' + socket.id);

  let boxStyle;
  for (let i=0; i<messages.length; i++) {
    if (messages[i].username === username) boxStyle = 'chat-my-message-box';
    else boxStyle = 'chat-other-message-box';
    document.getElementById("messagesArea").innerHTML +=
      "<div class='"+boxStyle+"'>" +
      "<div class='user-name'>"+messages[i].username+"</div>" +
      "  <img src='"+messages[i].avatar+"' class='user-icon'/>" +
      "  <div class='user-message'>"+messages[i].text+"</div>" +
      "</div>";
  }

  document.getElementById("addMessageBtn").onclick = addMessage;
  document.getElementById("changeNameBtn").onclick = changeNameBtn;

  function addMessage(e) {
    e.preventDefault();
    if (document.getElementById("msgInput").value !== '') {
      var ms = {
        avatar: currentAvatar,
        username: username,
        text: document.getElementById("msgInput").value
      };
      socket.emit('message-added', ms);
      messages.push(ms);
      console.log(socket);
      socket.emit('spotim/chat', messages);
      username = 'pikachu';
      boxStyle = 'chat-my-message-box';
      document.getElementById("messagesArea").innerHTML +=
        "<div class='"+boxStyle+"'>" +
        "<div class='user-name'>"+ms.username+"</div>" +
        "<img src='"+ms.avatar+"' class='user-icon'/>" +
        "<div class='user-message'>"+ms.text+"</div>" +
        "</div>";
      document.getElementById("msgInput").value = '';
    }
  }

  function changeNameBtn(e) {
    e.preventDefault();
    username = document.getElementById("usernameInput").value;
    currentAvatar = randomAvatar();
    document.getElementById("spotim-title-name").innerHTML = ' ' + username;
    document.getElementById("msgInput").disabled = false;
  }

  function randomAvatar(e) {
    return avatars[Math.floor(Math.random() * avatars.length)];
  }

  socket.on('spotim/chat', function (channelMessages) {
    console.log(channelMessages);
  });

});

socket.on("disconnect", function() {
  console.log("disconnected from chat server!");
});
