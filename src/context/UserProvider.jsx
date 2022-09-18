import React, { useEffect, useState } from "react";
import { getCurrentUserDetail, isLoggedIn } from "../auth";
import userContext from "./userContext";

function UserProvider({ children }) {

  const [user, setUser] = useState({
      name:"",
      email:"",
      about:""
  });

  
  useEffect(() => {
    setUser(getCurrentUserDetail());
    console.log(user)
  }, []);

 
  // const[user,setUser]=useState({
  //     name:'Siddhesh'
  // })
  // useEffect(()=>{
  //     setUser({
  //         name:"Siidhesh"
  //     })
  // },[])
//   const [login, setLogin] = useState(false);
//   const [userk, setUser] = useState(undefined);

//   useEffect(() => {
//     setLogin(isLoggedIn());
//     setUser(getCurrentUserDetail());
//   }, [login]);
  return <userContext.Provider value={user}>{children}</userContext.Provider>;
}

export default UserProvider;
