import React, { useEffect, useState } from "react";
import { db, auth } from "./../../firebase";
import moment from "moment";
import SendMsgBar from "../../components/SendMsgBar/SendMsgBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import PanToolIcon from "@material-ui/icons/PanTool";
import "./ChatBoard.scss";

function ChatBoard({ peerUserInfo: { id, photoUrl, userName, availibility } }) {
  const peerUserId = id;
  const peerUserPicurl = photoUrl;
  const peerUserName = userName;
  const peerUserAvailibility = availibility;
  const currentUserPic = auth().currentUser && auth().currentUser.photoURL;
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
  const currentUserId = localStorage.getItem("userID");
  //   let [newMessagesCounter, setNewMessagesCounter] = useState(0);

  useEffect(() => {
    getChatMessages();
  }, [peerUserId]);

  useEffect(() => {
    // getNewMsgsCounter();
  }, []);

  const handleChange = (event, emojiObject) => {
    setMessage(event.target.value);
  };

  const handleChooseEmoji = (event, emojiObject) => {
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
        updateScroll();
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
    const timestamp = (new Date().getTime() / 1000).toString();
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
        updateScroll();
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

  const renderMessages = ({ idFrom, content, timestamp }, index) => {
    if (idFrom === localStorage.getItem("userID")) {
      return (
        <div key={index} className="d-flex my-4 justify-content-end">
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
        <div key={index} className="d-flex my-4 justify-content-start">
          <UserAvatar
            img={peerUserPicurl}
            size="small"
            statusClass="status-circle-small"
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
      <section className="chat-board">
        {messagesList && messagesList.length > 0 ? (
          messagesList.map((message, index) => renderMessages(message, index))
        ) : (
          <div className="d-flex flex-column align-items-center mt-5">
            <UserAvatar
              img={peerUserPicurl}
              size="large"
              statusClass={`${
                peerUserAvailibility === "online" && "status-circle-large"
              } `}
            />
            <p className="user-name mt-3 d-flex flex-column align-items-center bold-font">
              {peerUserName}
            </p>
            <span>
              There is no chat between you and
              <span className="medium-font mx-1 peer-user-name">{peerUserName}</span>, Say hi
            </span>
            <PanToolIcon className="say-hi-icon mt-4" />
          </div>
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
