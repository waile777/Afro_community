import './register.css'
import openEye from "../../assets/svgs/eye-open.svg"
import closeEye from "../../assets/svgs/eye-close.svg"
import logoWithName from "../../assets/logo/logo_with_name.svg"
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api.js'
import React from 'react'

function Register() {

  const [errors, setErrors] = useState([])
  const [passwordOpen, setPasswordOpen] = useState(false)
  const [infoRegister, setInfoRegister] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isDj: false,
    stageName: null,
    bio: null,
    confirmationTerms: false

  })
  const handleConfirmationTerms = () => {
    setInfoRegister((older) => {
      return {
        ...older,
        confirmationTerms: !infoRegister.confirmationTerms
      }
    })
  }
  const handleDjContent = () => {
    setInfoRegister((older) => {
      return {
        ...older,
        isDj: !infoRegister.isDj
      }
    })
  }
  const handleInputs = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInfoRegister((older) => {
      return {
        ...older,
        [name]: value
      }
    })
  }




  return (
    <div className="register-page">
      <div className="left-section">
        <img src={logoWithName} className="logo-with-name" alt="AfroCommunity Logo" />
        <h1>Welcome To Afro Community</h1>
      </div>
      <div className="right-section">
        <div className='register-container'>
          <h2 className="title">Create Account</h2>
          <form action="" method="POST" className="register-form">
            <div className='full-name-section'>
              <div className="container-input first-name">
                <label htmlFor="first-name">First Name</label>
                <input type="text" onChange={(e) => handleInputs(e)} value={infoRegister.bio} name='firstName' />
              </div>
              <div className="container-input last-name">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" onChange={(e) => handleInputs(e)} value={infoRegister.lastName} name='lastName' />
              </div>
            </div>
            <div className="container-input email">
              <label htmlFor="email">Email</label>
              <input type="email" onChange={(e) => handleInputs(e)} value={infoRegister.email} name='email' />
            </div>
            <div className="container-input password">
              <label htmlFor="password">Password</label>
              <input type={passwordOpen ? 'text' : 'password'} onChange={(e) => handleInputs(e)} value={infoRegister.password} name='password' />
              <img src={passwordOpen ? closeEye : openEye} alt="eye" onClick={() => setPasswordOpen(!passwordOpen)} />
            </div>
            <div className="dj-section">
              <p className="question-dj"><em>T|T</em> Are You Dj?</p>
              <div className="check-dj">
                <input type="checkbox" onChange={() => handleDjContent()} checked={infoRegister.isDj ? true : false} name='isDj' />
                <p className="accept-conditions">
                  I want to <span>Upload mixes</span> and <span>host events</span>
                </p>
              </div>
              {infoRegister.isDj && (
                <>
                  <div className="container-input stage-name">
                    <label htmlFor="first-name">Stage Name</label>
                    <input type="text" onChange={(e) => handleInputs(e)} value={infoRegister.stageName} name='stageName' />
                  </div>
                  <div className="container-input bio">
                    <label htmlFor="first-name">Bio</label>
                    <textarea name="bio" onChange={(e) => handleInputs(e)} value={infoRegister.bio} id="bio"></textarea>
                  </div>
                </>
              )}

            </div>

            <button className='sign-up' type="submit">Sign Up</button>
            <div className="bottom-button-section">
              <div className="left">
                <input type="checkbox" checked={infoRegister.confirmationTerms ? true : false} name='confirmation' onChange={() => handleConfirmationTerms()} />
                <p>I confirm that i own the rights to the content i upload or have permission to share it.</p>
              </div>
              <div className="right">
                <p>Have An account already?<span>Login</span></p>
              </div>
            </div>
          </form>
          <div className="link-terms">
            <a href="">Terms & Content Policy</a>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Register