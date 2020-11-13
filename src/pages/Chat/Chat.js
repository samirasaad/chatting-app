import React, { useEffect } from "react";
import {auth} from './../../firebase'
function Chat() {
  useEffect(()=>{
    console.log(auth().currentUser)
  })
  return <span>chat</span>;
}

export default Chat;
