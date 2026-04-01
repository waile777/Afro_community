import './discover.css'
import NavLinks from '../../../components/navLinks/NavLinks'
import logoWithoutName from "../../../assets/logo/logo_bold_without_name.svg"
import React from 'react'
import { useState, useEffect } from 'react'
import DropDownProfile from '../../../components/dropDownProfile/DropDownProfile'

function Discover() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [dropDown, setDropDown] = useState({
    'profile': true,
    'bpm': false,
    'type': false,
  })


  const getTitleUser = () => {
    if (user.role === "dj") {
      return <p className="title">What are you playing today DJ <span>{user.dj_profile.stage_name}</span></p>
    } else {
      return <p className="title">What are you listening to today <span>{user.first_name}</span>?</p>
    }
  }
  useEffect(() => {
    console.log(user);
  })

  const handleDropDown = (e) => {
    const name = e.target.name
    setDropDown(prev => (
      {
        ...prev,
        [name]: !dropDown[name]
      }
    ))
  }

  return (
    <div className="discover">
      <header>
        <img src={logoWithoutName} className="left-section" alt="logo Afro Community" />
        {
          dropDown.profile && (<DropDownProfile />)
        }
        <NavLinks className="center-section" />
        <div className="right-section">
          <div className="profile-section">
            <img src={user.profile_picture} alt="profile user" />
            <i name="profile" className={`bi bi-chevron-${dropDown.profile ? 'down' : 'up'}`} onClick={(e) => handleDropDown(e)}></i>
          </div>
          <div className="notif-section">
            <i className="bi bi-bell-fill"></i>
            <div className="has-notif"></div>
          </div>
          <div className="other-options">
            <i className="bi bi-three-dots-vertical"></i>
          </div>
        </div>
      </header>

      <main className="main-section">
        <section className="top-section">
          <h2 className="title">
            {getTitleUser()}
          </h2>
          <div className="container-search-bar">
            <i className="bi bi-search"></i>
            <input type="text" name="searchInput" />
            <div className="bottom-search-input">
              <button>BPM <i name="bpm" onClick={(e) => handleDropDown(e)} className={`bi bi-chevron-${dropDown.bpm ? 'down' : 'up'}`}></i></button>
              <button>TYPE <i name="type" onClick={(e) => handleDropDown(e)} className={`bi bi-chevron-${dropDown.type ? 'down' : 'up'}`}></i></button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Discover