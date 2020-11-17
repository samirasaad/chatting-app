import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import WelcomeBoard from "../WelcomeBoard/WelcomeBoard";
import FilterBar from "../../components/FilterBar/FilterBar";
import ChatBoard from "../ChatBoard/ChatBoard";
import SettingsBrightnessTwoToneIcon from "@material-ui/icons/SettingsBrightnessTwoTone";
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

  const changeMode = () => {
    document.querySelector(".chat-wrapper").classList.toggle("dark-mode");
    document.querySelector(".chat-wrapper").classList.toggle("light-mode");
    document.querySelector(".mode-icon").classList.toggle("mode-icon-active");
  };
  return (
    <section className="light-mode chat-wrapper container-fluid">
      {/* <div className="d-flex flex-column">
        <span>mode</span>
        <SettingsBrightnessTwoToneIcon
          className="mode-icon"
          onClick={changeMode}
        />
      </div> */}
      <div className="row mx-0">
        <div className="col-md-4 section-bg">
          <FilterBar
            handleFilter={handleFilter}
            handleChange={handleChange}
            searchValue={searchValue}
          />
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
        <div className="col-md-8 section-bg messages-wrapper">
          {peerUserInfo ? (
            <ChatBoard peerUserInfo={peerUserInfo} peerUserId={peerUserId} />
          ) : (
            <WelcomeBoard />
          )}
        </div>
      </div>
    </section>
  );
}

export default Chat;
