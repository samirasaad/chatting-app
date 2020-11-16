import React, { useEffect, useState } from "react";
import { db, auth } from "./../../firebase";
import moment from "moment";
import SendMsgBar from "../../components/SendMsgBar/SendMsgBar";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import PanToolIcon from "@material-ui/icons/PanTool";
import "./ChatBoard.scss";

function ChatBoard({ peerUserInfo: { id, photoUrl, userName } }) {
  const peerUserId = id;
  const peerUserPicurl = photoUrl;
  const peerUserName = userName;
  const currentUserPic = auth().currentUser && auth().currentUser.photoURL;
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);
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
        <div key={index} className="d-flex my-4 justify-content-end">
          <p className="position-relative msg-bg-current-user mx-3 p-2">{content}</p>
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
          <p className="position-relative msg-bg-peer-user mx-3 p-2">{content}</p>
        </div>
      );
    }
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
              statusClass="status-circle-large"
            />
            <p className="user-name d-flex flex-column align-items-center bold-font">
              {peerUserName}
            </p>
            <span>
              There is no chat between you and{" "}
              <span className="medium-font">{peerUserName}</span>, Say hi
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
