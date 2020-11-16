import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import ChatBoard from "../ChatBoard/ChatBoard";
import { db } from "./../../firebase";
import './Chat.scss';
function Chat(props) {
  const [usersList, setUsersList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [peerUserInfo, setPeerUserInfo] = useState({});
  const currentUserId = localStorage.getItem("userID");
  const [peerUserId, setPeerUserId] = useState(props.match.params.id);
  const [searchValue, setSearchValue] = useState("");

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
        setFilteredList(usersList);
      });
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  };

  const handleFilter = (e) => {
    e.preventDefault();
    if (searchValue) {
      let filteredUsers = usersList.filter((user) => {
        return user.userName.toLowerCase().indexOf(searchValue) >= 0;
      });
      setFilteredList(filteredUsers);
    } else {
      setFilteredList(usersList);
    }
  };

  return (
    <section className="chat-wrapper row mx-0 container-fluid">
     
      <div className="col-md-4">
      <form onSubmit={handleFilter}>
        <input type='text' onChange={handleChange} value={searchValue} />
      </form>
        {filteredList &&
          filteredList.length > 0 &&
          filteredList.map((user) => (
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
          <ChatBoard peerUserId={peerUserId} />
        ) : (
          <WelcomeBoard />
        )}
      </div>
    </section>
  );
}

export default Chat;
