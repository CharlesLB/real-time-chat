import React, { useRef, useState } from "react";
import firebase from "firebase/app";
import { useCollectionData } from "react-firebase-hooks/firestore";

import ChatMessage from "../ChatMessage";

function ChatRoom(props) {
  const dummy = useRef();
  const messageRef = props.firestore.collection("messages");
  const query = messageRef.orderBy("createdAt").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });

  const [formValue, setFormValue] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = props.auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");

    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} auth={props.auth} />
          ))}

        {/* <span ref={dummy}></span> */}
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say Something"
        />

        <button type="submit" disabled={!formValue}>
          Send
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
