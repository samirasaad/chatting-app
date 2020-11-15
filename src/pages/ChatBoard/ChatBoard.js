import React, { useEffect, useState } from "react";
import { db } from "./../../firebase";
import moment from "moment";

function ChatBoard({ peerUserId }) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const currentUserId = localStorage.getItem("userID");
  const chatId = `${currentUserId}-${peerUserId}` || `${peerUserId}-${currentUserId}`;

  useEffect(() => {
    getChatMessages();
  }, [peerUserId]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getChatMessages = async () => {
    await db
      .collection("messages")
      .doc(`${currentUserId}-${peerUserId}`)
      .collection('chat')
      .onSnapshot((querySnapshot) => {
        let messages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessagesList(messages);
      });

      await db
      .collection("messages")
      .doc(`${peerUserId}-${currentUserId}`)
      .collection('chat')
      .onSnapshot((querySnapshot) => {
        let messages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessagesList(messages);
      });
  };

  const handleSubmitMessage = async (e, content, type) => {
    e.preventDefault();

    //for img
    // if (this.state.isShowSticker && type === 2) {
    //     this.setState({isShowSticker: false})
    // }

    //empty message dont send
    if (message.trim() === "") {
      return;
    }

    const timestamp = moment().valueOf().toString();

    const itemMessage = {
      idFrom: currentUserId,
      idTo: peerUserId,
      timestamp: timestamp,
      content: message.trim(),
      // type: type,
    };

    await db
      .collection("messages")
      .doc(`${currentUserId}-${peerUserId}`)
      .collection('chat')
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err)
        // this.props.showToast(0, err.toString());
      });

      await db
      .collection("messages")
      .doc(`${peerUserId}-${currentUserId}`)
      .collection('chat')
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
          console.log(err)
        // this.props.showToast(0, err.toString());
      });
  };

  return (
    <>
      {messagesList && messagesList.length > 0 ? (
        messagesList.map((message) => <p>{message.content}</p>)
      ) : (
        <p>start chating</p>
      )}
      <form onSubmit={handleSubmitMessage}>
        <input type="text" onChange={handleChange} value={message} />
      </form>
    </>
  );
}

export default ChatBoard;
