import React, { useEffect, useState } from "react";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import UsersList from "../../components/UsersList/UsersList";
import UserProfile from "../../components/UserProfile/UserProfile";
import ChatBoard from "../ChatBoard/ChatBoard";
import NavBar from "./../../components/NavBar/NavBar";
import { db } from "./../../firebase";
import "./Chat.scss";

function Chat(props) {
  const [usersList, setUsersList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [peerUserInfo, setPeerUserInfo] = useState({});
  const [peerUserId, setPeerUserId] = useState(props.match.params.id);
  const [searchValue, setSearchValue] = useState("");
  const [isDark, setIsDark] = useState(false);
  const currentUserId = localStorage.getItem("userID");

  useEffect(() => {
    setIsDark(JSON.parse(localStorage.getItem("isDark") || false));
  });

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    setPeerUserId(props.match.params.id);
    peerUserId && getCurrentPeerUser(props.match.params.id);
  }, [props.match.params.id]);

  const getCurrentPeerUser = async (id) => {
    if (id) {
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
    }
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
      })
      .catch((err) => console.log(err));
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
      <section
        className={`${
          isDark ? "dark-mode" : "light-mode"
        } chat-wrapper py-1 container-fluid`}
      >
        <div className="row mx-0">
          <div className="col-lg-3 col-md-12">
            <UserProfile />
          </div>
          <div className="col-lg-6 col-md-8 section-bg messages-wrapper postion-relative">
            {peerUserInfo && peerUserId && (
              <div className="chat-heading position-sticky">
                <p className="medium-font py-2 mb-0">
                  {peerUserInfo.userName}
                  <span
                    className={` mx-1 ${
                      peerUserInfo.availibility === "online"
                        ? "text-success"
                        : "text-muted"
                    }`}
                  >
                    {peerUserInfo.availibility}
                  </span>
                </p>
              </div>
            )}
            {peerUserInfo && peerUserId ? (
              <ChatBoard peerUserInfo={peerUserInfo} />
            ) : (
              <WelcomeBoard />
            )}
          </div>
          <div className="col-lg-3 col-md-4 section-bg px-0">
            <UsersList
              handleChange={handleChange}
              handleFilter={handleFilter}
              searchValue={searchValue}
              filteredList={filteredList}
              peerUserId={peerUserId}
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Chat;
