import './home.css'
import api from '../../api.js'
import React from 'react'
import { useState, useEffect } from 'react'
import imageDj from "../../assets/djs/dj.jpg"
import imageEvent from "../../assets/events/event.jpg"
import logoWithoutName from "../../assets/logo/logo_bold_without_name.svg"
import { useNavigate } from 'react-router-dom'
import Footer from "../../components/footer/Footer"

function Home() {
  const navigate = useNavigate()
  const [becomeDj, setBecomeDJ] = useState(false)


  const getMixes = async () => {
    try {
      const { data } = await api.get('/mixes')
      console.log(data)

    } catch (err) {
      console.log(err);

    }
  }

  useEffect(() => {
    getMixes()
  }, [])




  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log(user);

  }, [user])



  return (
    <div className='home'>
      {
        becomeDj && (
          <div className="info-dj">
            <div className="container-input stage-name">
              <input type="text" placeholder="stage Name" />
            </div>
            <div className="container-input bio">
              <textarea name="bio" id="bio"></textarea>
            </div>
            <button>Enter</button>
            <div className="temrs-confirmation-section">
              <input type="checkbox" />
              <p>
                I confirm that i own the rights to the content i upload or have permission to share it.</p>
            </div>
          </div>
        )
      }
      <header>
        <img src={imageDj} alt="image Afro Community" />
        <div className="top">
          <img src={logoWithoutName} className="top-left" alt="logo Afro Community" />
          <div className="top-right">
            <button className="sign-up" onClick={() => navigate('/login')}>Sign Up</button>
            <button className="create-account" onClick={() => navigate('/register')}>Create Account</button>
          </div>

        </div>
        <div className="center">
          <h1 className="title">Welcome to <span>Afro Community</span></h1>
          <p className="description">
            Hear what's trending for free in the Afro Community.
            Discover new tracks, playlists, and connect with DJs around the world.
          </p>
        </div>
        <div className="bottom">
          <button className="get-started">Get Started</button>
        </div>

      </header>

      <div className="search-bar-container">
        <div className="input-container">
          <input type="text" placeholder="Search for DJs or mixes..." />
          <i class="bi bi-search"></i>
        </div>
        <span>or</span>
        <button className="upload">Upload Your own</button>
      </div>

      {/* section trending mixes coming sun */}

      <div className="events-empty container-event">
        <img src={imageEvent} alt="no events" />
        <h2 className="title">No events yet</h2>
        {user && user.role !== 'dj' && (
          <>
            <p className="description">
              Want to host your own events? Become a DJ.
            </p>
            <button>Become a DJ</button>
          </>

        )}
        {user && user.role === 'dj' && (
          <>
            <p>
              Start by creating your first event
            </p>
            <button>Create Event</button>
          </>

        )}
      </div>

      {
        !user && (
          <div className="thanks-container">
            <h3 className="title">Thanks for enjoying. Now Join in.</h3>
            <p>save mixes, follow Djs and build playlists.all for free.</p>
            <button className="create-account" onClick={() => navigate('/register')}>Create Account</button>
            <div className="login-section">
              <p>already have an account?</p>
              <a href="/login">Sign In</a>
            </div>
          </div>

          // logout
        )
      }


      <footer>
        <Footer />
      </footer>

    </div>
  )
}

export default Home