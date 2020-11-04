import React, { useEffect, useState } from "react";
import db from "./../firebase";
const Home = () => {
  const [usersList, setUsersList] = useState([]);
  const [usersData, setUserData] = useState({});
  useEffect(() => {
    //getting all users` data
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        let userData = querySnapshot.docs.map((doc) => {
          return doc.data();
        });
        setUsersList(userData);
      });

    // get spcific user`s data
    db.collection("users")
      .doc("1FVxJl6S5JdjMPiJvmlr")
      .get()
      .then((querySnapshot) => {
        setUserData(querySnapshot.data());
      });
  }, []);
  return (
    <>
      <p>specific user`s data using doc id</p>
      <p>name: {usersData.name}</p>
      <p>age: {usersData.age}</p>
      <hr></hr>
      {usersList.length > 0 &&
        usersList.map((user, index) => (
          <ul key={index}>
            <li>{user.name}</li>
            <li>{user.age}</li>
          </ul>
        ))}
    </>
  );
};

export default Home;
