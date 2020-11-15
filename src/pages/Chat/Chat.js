import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import ChatBoard from "../ChatBoard/ChatBoard";
import { db } from "./../../firebase";
function Chat(props) {
  const [usersList, setUsersList] = useState([]);
  const [peerUserInfo, setPeerUserInfo] = useState({});
  const currentUserId = localStorage.getItem("userID");
  const [peerUserId, setPeerUserId] = useState(props.match.params.id);

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    setPeerUserId(props.match.params.id);
    peerUserId && getCurrentPeerUser(props.match.params.id);
  }, [props.match.params.id]);

  const getCurrentPeerUser = async (id) => {
    await db
      .collection("users")
      .where("id", "==", id)
      .get()
      .then((querySnapshot) => {
        let peerUser = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setPeerUserInfo(peerUser[0]);
      });
  };

  const getUsersList = async () => {
    await db
      .collection("users")
      .where("id", "!=", currentUserId)
      .get()
      .then((querySnapshot) => {
        let usersList = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setUsersList(usersList);
      });
  };

  return (
    <section className="chat-wrapper row">
      <div className="col-md-4">
        {usersList &&
          usersList.length > 0 &&
          usersList.map((user) => (
            <Link to={`/chat/${user.id}`} key={user.id}>
              <p>
                {user.userName}
                {user.availibility}
              </p>
            </Link>
          ))}
      </div>
      <div className="col-md-7">
      {peerUserInfo ? (
        <ChatBoard peerUserId={peerUserId}/>
      ) : (
       <WelcomeBoard />
      )}
        </div>
    </section>
  );
}

export default Chat;
