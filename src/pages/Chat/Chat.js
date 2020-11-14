import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { db } from "./../../firebase";
function Chat() {
  const [usersList, setUsersList] = useState([]);
  const [message, setMessage] = useState("");
  const userId = useParams().id;
  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    console.log("get messages but firstly check if id !== index ");
  }, [userId]);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const getUsersList = async () => {
    await db
      .collection("users")
      .where("id", "!=", userId)
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
      {/* index for welcome page otherwise user choose a chat room */}
      {userId !== "index" ? (
        <div className="col-md-7">
          chat room
          <input type="text" value={message} onChange={handleChange} />
        </div>
      ) : (
        <p>welcome page</p>
      )}
    </section>
  );
}

export default Chat;
