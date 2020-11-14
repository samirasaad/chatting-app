import React, { useEffect, useState } from "react";
import { db,auth } from "./../../firebase";
function Chat() {
  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    getUsersList();
    console.log(auth().currentUser)
  },[]);

  const getUsersList = async () => {
    await db
      .collection("users")
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
          usersList.map((user) => <p key={user.id}>{user.userName}</p>)}
      </div>
    </section>
  );
}

export default Chat;
