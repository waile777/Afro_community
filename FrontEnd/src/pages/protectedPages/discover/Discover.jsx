import './discover.css'
import NavLinks from '../../../components/navLinks/NavLinks'
import logoWithoutName from "../../../assets/logo/logo_bold_without_name.svg"
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import DropDownProfile from '../../../components/dropDownProfile/DropDownProfile'

function Discover() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate()
  const [dropDown, setDropDown] = useState({
    'profile': false,
    'bpm': false,
    'type': false,
    'notif': false,
    'options': false,
    'expandedSearch' : false
  })


  const getTitleUser = () => {
    if (user.role === "dj") {
      return <h2 className="title">What are you playing today DJ <span className = "name-user">{user.dj_profile.stage_name}</span></h2>
    } else {
      return <h2 className="title">What are you listening to today <span className = "name-user">{user.first_name}</span>?</h2>
    }
  }
  useEffect(() => {
    console.log(user);
  })

  const handleDropDown = (e) => {
    const name = e.currentTarget.getAttribute('name')
    console.log(name);

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
        <img onClick={() => navigate('/discover')} src={logoWithoutName} className="left-section" alt="logo Afro Community" />
        {
          dropDown.profile && (<DropDownProfile />)
        }
        <NavLinks className="center-section" />
        <div className="right-section">
          <div className="profile-section">
            <img src={user.profile_picture} name="profile" onClick={(e) => handleDropDown(e)} alt="profile user" />
            <i name="profile" className={`bi bi-chevron-${dropDown.profile ? 'up clicked' : 'down'}`} onClick={(e) => handleDropDown(e)}></i>
          </div>
          <div className="other-section">
            <div className="notif-section">
              <i className={`bi bi-bell-fill ${dropDown.notif ? ' clicked' : ''}`} onClick={handleDropDown} name="notif"></i>
              <div className="has-notif"></div>
            </div>
            <div className="other-options">
              <i name="options" className={`bi bi-three-dots-vertical ${dropDown.options ? ' clicked' : ''}`} onClick={handleDropDown}></i>
            </div>
          </div>

        </div>
      </header>

      <main className="main-section">
        <section className="top-section">
          {getTitleUser()}
          <div className={`container-search-bar ${!dropDown.expandedSearch ? ' expanded-search-bar' : ''}`}>
            <i className="bi bi-search"></i>
            <i name = "expandedSearch" onClick = {handleDropDown} class={`bi bi-arrows-angle${!dropDown.expandedSearch ? '-expand' : '-contract'} arrows-angle  ${dropDown.expandedSearch ? 'expanded' : 'contract'}`}></i>
            <textarea maxLength = "80" type="text" name="searchInput" placeholder = "search for Dj, Mixes..." />
            <div className="bottom-search-input">
              <button name="bpm" onClick={(e) => handleDropDown(e)} >BPM <i className={`bi bi-chevron-${dropDown.bpm ? 'up' : 'down'}`}></i></button>
              <button name="type" onClick={(e) => handleDropDown(e)}>TYPE <i className={`bi bi-chevron-${dropDown.type ? 'up' : 'down'}`}></i></button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default Discover