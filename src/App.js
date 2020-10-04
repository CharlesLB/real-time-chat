import React from "react";
import './app.css';

import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

import ChatRoom from './components/ChatRoom';
import SignIn from './components/SignIn';

firebase.initializeApp({
  apiKey: "AIzaSyDLhzVFnwhCSrM9sqHK40R3drVRm1Qh9_g",
  authDomain: "real-time-chat-charleslb.firebaseapp.com",
  databaseURL: "https://real-time-chat-charleslb.firebaseio.com",
  projectId: "real-time-chat-charleslb",
  storageBucket: "real-time-chat-charleslb.appspot.com",
  messagingSenderId: "519740847421",
  appId: "1:519740847421:web:92087cf3ea3bf366310154",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return <div className="App">
    <header>

    </header>

    <section>
      {user ? <ChatRoom auth={auth} firestore={firestore}/> : <SignIn auth={auth}/>}
    </section>
  </div>;
}

export default App;
