import React from 'react'
import {useSelector } from 'react-redux'
export default function Home() {
  let {userLogin}=useSelector(state=>state.UserLoginCyberBugsReducer)
  return (
    <div>
        <p>{userLogin?.name}</p>
        <img src={userLogin.avatar} alt="" />
    </div>
  )
}


