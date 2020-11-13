import React, { useEffect } from "react";
import {db} from './../../firebase'
function Chat() {
  useEffect(()=>{
    console.log()
    
  })

 const getListUser = async () => {
    // const result = await db.collection(AppString.NODE_USERS).get()
    // if (result.docs.length > 0) {
    //     this.listUser = [...result.docs]
    //     this.setState({isLoading: false})
    // }
}

  return <span>chat</span>;
}

export default Chat;
