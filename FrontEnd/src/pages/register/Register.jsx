import './register.css'
import openEye from "../../assets/svgs/eye-open.svg"
import closeEye from "../../assets/svgs/eye-close.svg"
import logoWithName from "../../assets/logo/logo_with_name.svg"
import defaultprofile_picture from "../../assets/profile_picture/default_profile.jpg"
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api.js'
import React from 'react'

function Register() {
  const navigate = useNavigate()

  const [errors, setErrors] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    stage_name: '',
    bio: '',
    confirmation_terms: ''
  })
  const [passwordOpen, setPasswordOpen] = useState(true)
  const [textareaCount, setTextareaCount] = useState(0)
  const [infoRegister, setInfoRegister] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    is_dj: false,
    stage_name: '',
    bio: '',
    confirmation_terms: false,
    profile_picture: null,
  })
  const [statePage, setStatePage] = useState('idle')
  const handleConfirmationTerms = () => {
    setInfoRegister((older) => {
      return {
        ...older,
        confirmation_terms: !infoRegister.confirmation_terms
      }
    })
  }
  const handleDjContent = () => {
    setInfoRegister((older) => {
      return {
        ...older,
        is_dj: !infoRegister.is_dj
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
    if (name === 'bio') setTextareaCount(() => value.length)
  }
  const handleprofile_picture = (e) => {
    const file = e.target.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setInfoRegister((infos) => {
          return {
            ...infos,
            profile_picture: reader.result
          }
        })
      }
      reader.readAsDataURL(file)
    }


  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatePage('waiting')
    if (!infoRegister.confirmation_terms) {
      setStatePage('error');
      setErrors(prev => ({
        ...prev,
        confirmation_terms: 'You must accept the terms and conditions to continue.'
      }))
      return;
    }

    const formData = new FormData();
    formData.append('first_name', infoRegister.first_name);
    formData.append('last_name', infoRegister.last_name);
    formData.append('email', infoRegister.email);
    formData.append('password', infoRegister.password);
    formData.append('is_dj', infoRegister.is_dj ? 1 : 0);
    infoRegister.is_dj ? formData.append('stage_name', infoRegister.stage_name) : null;
    infoRegister.is_dj ? formData.append('bio', infoRegister.bio) : null;
    formData.append('confirmation_terms', infoRegister.confirmation_terms ? 1 : 0);

    if (infoRegister.profile_picture instanceof File) {
      formData.append('profile_picture', infoRegister.profile_picture);
    }

    try {
      const res = await api.post('/register', formData, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data'
        }
      });
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      console.log(res.data)
      navigate("/discover")
    } catch (error) {
      if (error.response?.status === 422) {
        const backendErrors = error.response.data.errors;
        setErrors(prev => ({
          first_name: backendErrors.first_name?.[0] || '',
          last_name: backendErrors.last_name?.[0] || '',
          email: backendErrors.email?.[0] || '',
          password: backendErrors.password?.[0] || '',
          stage_name: backendErrors.stage_name?.[0] || '',
          bio: backendErrors.bio?.[0] || '',
        }));
        setStatePage('error');
        console.log(backendErrors);
        
      }
    }
  };

  useEffect(() => {
    console.log(errors)
  }, [errors])




  return (
    <div className="register-page">
      <div className="left-section">
        <img src={logoWithName} className="logo-with-name" alt="AfroCommunity Logo" />
        <h1>Welcome To Afro Community</h1>
      </div>
      <div className="right-section">
        <div className='register-container'>
          <div className="container-profile-title">
            <h2 className="title">Create Account</h2>
            <div className="container-profile">
              <img src={!infoRegister.profile_picture ? defaultprofile_picture : infoRegister.profile_picture} alt="profile_picture" />
              <label htmlFor="profile_picture" className='label-profile-picture'>Upload Profile</label>
              <input type="file" id='profile_picture' name="profile_picture" onChange={(e) => handleprofile_picture(e)} />
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)} method="POST" className="register-form">
            <div className='double-inputs-section'>
              <div className="container-input first-name">
                <label htmlFor="first-name">First Name</label>
                <input type="text" onChange={(e) => handleInputs(e)} value={infoRegister.first_name} name='first_name' />
                {errors.first_name ? <p className='error'>{errors.first_name}</p> : undefined}
              </div>
              <div className="container-input last-name">
                <label htmlFor="last-name">Last Name</label>
                <input type="text" onChange={(e) => handleInputs(e)} value={infoRegister.last_name} name='last_name' />
                {errors.last_name ? <p className='error'>{errors.last_name}</p> : undefined}
              </div>
            </div>
            <div className="double-inputs-section">
              <div className="container-input email">
                <label htmlFor="email">Email</label>
                <input type="text" onChange={(e) => handleInputs(e)} value={infoRegister.email} name='email' />
                {errors.email ? <p className='error'>{errors.email}</p> : undefined}
              </div>
              <div className="container-input password">
                <label htmlFor="password">Password</label>
                <input type={!passwordOpen ? 'text' : 'password'} onChange={(e) => handleInputs(e)} value={infoRegister.password} name='password' />
                {errors.password ? <p className='error'>{errors.password}</p> : undefined}
                <img className='password-eye' src={passwordOpen ? closeEye : openEye} alt="eye" onClick={() => setPasswordOpen(!passwordOpen)} />
              </div>
            </div>

            <div className="dj-section">
              <p className="question-dj"><b>T|T </b> Are You Dj?</p>
              <div className="check-dj">
                <input type="checkbox" onChange={() => handleDjContent()} checked={infoRegister.is_dj ? true : false} name='is_dj' />
                <p className="accept-conditions">
                  I want to <span>Upload mixes</span> and <span>host events</span>
                </p>
              </div>
              {infoRegister.is_dj && (
                <div className='info-dj'>
                  <div className="container-input stage-name">
                    <label htmlFor="first-name">Stage Name</label>
                    <input type="text" onChange={(e) => handleInputs(e)} value={infoRegister.stage_name} name='stage_name' />
                    {errors.stage_name ? <p className='error'>{errors.stage_name}</p> : undefined}
                  </div>
                  <div className="container-input bio">
                    <label htmlFor="first-name">Bio</label>
                    <p className='count'>{textareaCount}/300</p>
                    <textarea maxLength="300" name="bio" onChange={(e) => handleInputs(e)} value={infoRegister.bio} id="bio"></textarea>
                    {errors.bio ? <p className='error'>{errors.bio}</p> : undefined}
                  </div>
                </div>
              )}

            </div>

            <div className="button-section">
              <div className={`waiting-icon ${statePage === "waiting" ? "waiting" : undefined}`}></div>
              <button type="submit" className={`sign-up ${statePage === "waiting" ? "waiting" : undefined}`}>Sign Up</button>
              <div className="bottom-button-section">
                <div className="left">
                  <div className="confiramtion-section">
                    <input type="checkbox" checked={infoRegister.confirmation_terms ? true : false} name='confirmation' onChange={() => handleConfirmationTerms()} />
                    <p>I confirm that i own the rights to the content i upload or have permission to share it.</p>
                  </div>
                  {errors.confirmation_terms ? <p className='error'>{errors.confirmation_terms}</p> : undefined}
                </div>
                <div className="right">
                  <p>Have An account already?<span onClick={() => navigate('/login')}>Login</span></p>
                </div>
              </div>
            </div>
          </form>
          <a href="" className='link-terms'>Terms & Content Policy</a>
        </div>
      </div>
    </div>

  )
}

export default Register