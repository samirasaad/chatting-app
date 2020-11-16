import React, { useEffect, useState } from "react";
import { db } from "./../../firebase";
import Emojis from "../../components/Emojis/Emojis";
import moment from "moment";

function ChatBoard({ peerUserId }) {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const currentUserId = localStorage.getItem("userID");
  //   let [newMessagesCounter, setNewMessagesCounter] = useState(0);
  const chatId =
    `${currentUserId}-${peerUserId}` || `${peerUserId}-${currentUserId}`;

  useEffect(() => {
    getChatMessages();
  }, [peerUserId]);

  //   useEffect(() => {
  //     getNewMsgsCounter();
  //   }, []);

  const handleChange = (event, emojiObject) => {
    console.log(event.target.value);
    setMessage(event.target.value);
  };

  const handleChooseEmoji = (event, emojiObject) => {
    console.log(emojiObject);
    setMessage(message + emojiObject.emoji);
  };

  //   const getNewMsgsCounter = async () => {
  //     await db
  //       .collection("messages")
  //       .doc(`${currentUserId}-${peerUserId}`)
  //       .collection("chat")
  //       .onSnapshot((querySnapshot) => {
  //         setNewMessagesCounter(
  //           querySnapshot.docs[querySnapshot.docs.length - 1].data()
  //             .newMessagesCounter
  //         );
  //       });
  //   };
  const getChatMessages = async () => {
    await db
      .collection("messages")
      .doc(`${currentUserId}-${peerUserId}`)
      .collection("chat")
      .onSnapshot((querySnapshot) => {
        let messages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessagesList(messages);
      });

    //   await db
    //   .collection("messages")
    //   .doc(`${peerUserId}-${currentUserId}`)
    //   .collection('chat')
    //   .onSnapshot((querySnapshot) => {
    //     let messages = querySnapshot.docs.map((doc) => {
    //       return doc.data();
    //     });
    //     setMessagesList(messages);
    //   });
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();

    //for img
    // if (this.state.isShowSticker && type === 2) {
    //     this.setState({isShowSticker: false})
    // }

    if (message.trim() === "") {
      //empty message dont send
      return;
    } else {
      //   setNewMessagesCounter(newMessagesCounter + 1);
    }

    const timestamp = moment().valueOf().toString();

    const itemMessage = {
      idFrom: currentUserId,
      idTo: peerUserId,
      timestamp,
      content: message.trim(),
      //   newMessagesCounter,
    };

    await db
      .collection("messages")
      .doc(`${currentUserId}-${peerUserId}`)
      .collection("chat")
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        // this.props.showToast(0, err.toString());
      });

    await db
      .collection("messages")
      .doc(`${peerUserId}-${currentUserId}`)
      .collection("chat")
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
        // this.props.showToast(0, err.toString());
      });
  };

  const renderMessages = ({ idFrom, content }, index) => {
    if (idFrom === localStorage.getItem("userID")) {
      return (
        <div className="d-flex justify-content-end">
          <p key={index}>{content}</p>
        </div>
      );
    } else {
      return (
        <div className="d-flex justify-content-start">
          <p key={index}>{content}</p>
        </div>
      );
    }
  };

  return (
    <>
      <div className="flex">
        {messagesList && messagesList.length > 0 ? (
          messagesList.map((message, index) => renderMessages(message, index))
        ) : (
          <p>start chating</p>
        )}
      </div>
      <form onSubmit={handleSubmitMessage}>
        <input type="text" onChange={handleChange} value={message} />
      </form>
      <Emojis handleEmojiClick={handleChooseEmoji} />
    </>
  );
}

export default ChatBoard;
