import { useEffect, useState } from "react";
import {
  collection,
  orderBy,
  limit,
  query,
  onSnapshot,
  addDoc,
  serverTimestamp
} from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message";

const Channel = ({ user = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const { uid, displayName, photoURL } = user;

  useEffect(() => {
    const messagesRef = collection(db, "messages");
    const q = query(messagesRef, orderBy("createdAt"), limit(100));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMessages(data);
    });
    // Detach listener
    return unsubscribe;
  });

  const handleOnChange = e => {
    setNewMessage(e.target.value);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
  
    const trimmedMessage = newMessage.trim();
    if (trimmedMessage) {
      const messagesRef = collection(db, "messages");
      // Add new message in Firestore
      await addDoc(messagesRef, {
        text: trimmedMessage,
        createdAt: serverTimestamp(),
        uid,
        displayName,
        photoURL,
      });
      // Clear input field
      setNewMessage('');
    }
  };
  return (
    <>
    <ul>
      {messages.map((el) => (
        <Message {...el} />
      ))}
    </ul>
          <form
          onSubmit={handleOnSubmit}>
          <input
            type="text"
            value={newMessage}
            onChange={handleOnChange}
            placeholder="Type your message here..."
          />
          <button
            type="submit"
            disabled={!newMessage}
          >
            Send
          </button>
        </form>
        </>
  )
};

export default Channel;
