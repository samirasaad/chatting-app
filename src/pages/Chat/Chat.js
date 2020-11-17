import React, { useEffect, useState } from "react";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import UsersList from "../../components/UsersList/UsersList";
import ChatBoard from "../ChatBoard/ChatBoard";
import NavBar from "./../../components/NavBar/NavBar";
import { db } from "./../../firebase";
import "./Chat.scss";
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
    <>
     <NavBar />
    <section className="light-mode chat-wrapper py-1 container-fluid">
      <div className="row mx-0">
        <div className="col-md-3 section-bg">
          <UsersList
            handleChange={handleChange}
            handleFilter={handleFilter}
            searchValue={searchValue}
            filteredList={filteredList}
            peerUserId={peerUserId}
          />
        </div>
        <div className="col-md-9 section-bg messages-wrapper">
          {/* <div className='position-relative'> */}
          {peerUserInfo ? (
            <ChatBoard peerUserInfo={peerUserInfo} peerUserId={peerUserId} />
            ) : (
              <WelcomeBoard />
              )}
              </div>
        {/* </div> */}
      </div>
    </section>
    </>
  );
}

export default Chat;
