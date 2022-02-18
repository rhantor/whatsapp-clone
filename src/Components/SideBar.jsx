import React from 'react'
import Header from "./Header"
import "../css/Profile/SideBar.css"
import UsersSec from './UsersSec'

const SideBar = () => {

  return (
    <>
      <div className='sideBar'>
 
          <Header />
       
        <div className="userSection">
            <UsersSec />
        </div>
      </div>
    </>
  )
}

export default SideBar