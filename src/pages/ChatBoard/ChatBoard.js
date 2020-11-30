import React, { useEffect, useState } from "react";
import SendMsgBar from "../../components/SendMsgBar/SendMsgBar";
import Loader from "../../components/Loader/Loader";
import NoChat from "../../components/NoChat/NoChat";
import Message from "./../../components/Message/Message";
import { db } from "./../../firebase";
import { MESSAGES, CHAT } from "./../../utils/constants";
import "./ChatBoard.scss";

function ChatBoard({ peerUserInfo: { id, photoUrl, userName, availibility } }) {
  const [loading, setLoading] = useState(false);
  const peerUserId = id;
  const peerUserPicurl = photoUrl;
  const peerUserName = userName;
  const peerUserAvailibility = availibility;
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const currentUserPic = localStorage.getItem("userPic");
  const currentUserId = localStorage.getItem("userID");

  useEffect(() => {
    getChatMessages();
    setMessage("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peerUserId]);

  useEffect(() => {
    var chatContainer = document.querySelector(".messages-wrapper");
    chatContainer.scrollTop = chatContainer.scrollHeight;
    if (chatContainer.scrollHeight <= chatContainer.clientHeight) {
      document.querySelector(".send-msg-bar").style.top = "100%";
    } else {
      document.querySelector(".send-msg-bar").style.bottom = "0";
      document.querySelector(".send-msg-bar").style.top = "0";
    }
  }, [peerUserId, messagesList]);

  const handleChange = (event, emojiObject) => {
    setMessage(event.target.value);
  };

  const handleChooseEmoji = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const getChatMessages = async () => {
    setLoading(true);
    await db
      .collection(MESSAGES)
      .doc(`${currentUserId}-${peerUserId}`)
      .collection(CHAT)
      .onSnapshot((querySnapshot) => {
        let messages = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessagesList(messages);
        updateScroll();
        setLoading(false);
      });
  };

  const handleSubmitMessage = async (e) => {
    e.preventDefault();
    if (message.trim() === "") {
      //empty message ? dont send
      return;
    }
    const timestamp = (new Date().getTime() / 1000).toString();
    const itemMessage = {
      idFrom: currentUserId,
      idTo: peerUserId,
      timestamp,
      content: message.trim().charAt(0).toUpperCase() + message.slice(1),
    };
    await db
      .collection(MESSAGES)
      .doc(`${currentUserId}-${peerUserId}`)
      .collection(CHAT)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        setMessage("");
        updateScroll();
      })
      .catch((err) => {
        console.log(err);
      });

    await db
      .collection(MESSAGES)
      .doc(`${peerUserId}-${currentUserId}`)
      .collection(CHAT)
      .doc(timestamp)
      .set(itemMessage)
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateScroll = () => {
    var chatContainer = document.querySelector(".messages-wrapper");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  return (
    <>
      <section className={`chat-board chat-min-height `}>
        {loading && <Loader loading={loading} />}
        {messagesList && messagesList.length > 0 ? (
          messagesList.map((message, index) => (
            <Message
              message={message}
              index={index}
              peerUserInfo={{
                peerUserPicurl,
                peerUserAvailibility,
              }}
              currentUserPic={currentUserPic}
            />
          ))
        ) : (
          <NoChat
            peerUserPicurl={peerUserPicurl}
            peerUserAvailibility={peerUserAvailibility}
            peerUserName={peerUserName}
          />
        )}
      </section>
      <SendMsgBar
        handleSubmitMessage={handleSubmitMessage}
        handleChange={handleChange}
        handleChooseEmoji={handleChooseEmoji}
        message={message}
      />
    </>
  );
}

export default ChatBoard;
