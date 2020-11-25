import React, { useEffect, useState } from "react";
import SendMsgBar from "../../components/SendMsgBar/SendMsgBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import Loader from "../../components/Loader/Loader";
import NoChat from "../../components/NoChat/NoChat";
import { db } from "./../../firebase";
import moment from "moment";
import { MESSAGES, CHAT, ONLINE } from "./../../utils/constants";
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

    //   await db
    //   .collection(MESSAGES)
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
    if (message.trim() === "") {
      //empty message ? dont send
      return;
    }
    const timestamp = (new Date().getTime() / 1000).toString();
    const itemMessage = {
      idFrom: currentUserId,
      idTo: peerUserId,
      timestamp,
      content: message.trim(),
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

  const renderMessages = ({ idFrom, content, timestamp }, index) => {
    if (idFrom === localStorage.getItem("userID")) {
      return (
        <div key={index} className="d-flex px-3 my-4 justify-content-end">
          <div className="d-flex flex-column align-items-end">
            <p className="position-relative msg-bg-current-user mx-3 p-2 mb-0">
              {content}
            </p>
            <small className="mx-3 time">
              {moment(timestamp * 1000).format("DD/MM/YYYY , h:mm A")}
            </small>
          </div>
          <UserAvatar
            img={currentUserPic}
            size="small"
            statusClass="status-circle-small"
          />
        </div>
      );
    } else {
      return (
        <div key={index} className="d-flex px-3 my-4 justify-content-start">
          <UserAvatar
            img={peerUserPicurl}
            size="small"
            statusClass={`${
              peerUserAvailibility === ONLINE && "status-circle-small"
            } `}
          />
          <div className="d-flex flex-column align-items-start">
            <p className="position-relative msg-bg-peer-user mx-3 p-2 mb-0">
              {content}
            </p>
            <small className="mx-3 time">
              {moment(timestamp * 1000).format("DD/MM/YYYY , h:mm A")}
            </small>
          </div>
        </div>
      );
    }
  };

  const updateScroll = () => {
    var chatContainer = document.querySelector(".messages-wrapper");
    chatContainer.scrollTop = chatContainer.scrollHeight;
  };

  return (
    <>
      <section
        className={`chat-board px-3${
          messagesList.length === 0 && "chat-min-height"
        } `}
      >
        <Loader loading={loading} />
        {messagesList && messagesList.length > 0 ? (
          messagesList.map((message, index) => renderMessages(message, index))
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
