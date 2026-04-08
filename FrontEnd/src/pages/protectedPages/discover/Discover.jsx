import './discover.css'
import api from '../../../api.js'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import Footer from "../../../components/footer/Footer"
// import Data Main
import RecentlyPlayed from "../../../components/recentlyPlayed/RecentlyPlayed"
import MoreOfWhatYouLike from "../../../components/moreOfWhatYouLike/MoreOfWhatYouLike"
import DjsShouldFollow from "../../../components/djsShouldFollow/DjsShouldFollow"
import VerificationPopup from "../../../components/verificationPopup/VerificationPopup.jsx"
import { useNotifications } from "@/context/NotificationContext"
function Discover() {
  const { notifications } = useNotifications()
  const user = JSON.parse(localStorage.getItem('user'));
  const maxValuesBPM = 3;
  const profileRef = useRef(null);
  const bpmRef = useRef(null);
  const typeRef = useRef(null);
  const notifRef = useRef(null);
  const navigate = useNavigate()
  const [dropDown, setDropDown] = useState({
    'profile': false,
    'bpm': false,
    'type': false,
    'notif': true,
    'options': false,
    'expandedSearch': false
  })
  const [genres, setGenres] = useState([])

  const [infoSelectedSearchQuery, setInfoSelectedSearchQuery] = useState({
    'bpm': 'all',
    'type': 'all',
    'inputBPM': '',
    'errorBPM': ''
  })









  // handle indo selected search query
  const handleInfoSelectedSearchQuery = (e) => {
    const name = e.currentTarget.getAttribute('name')
    let value = ""
    if (name === 'type') value = e.currentTarget.getAttribute('value')
    if (name === 'bpm') value = infoSelectedSearchQuery.inputBPM
    console.log(name);


    if (value === 'all' && infoSelectedSearchQuery[name] === 'all') return
    if (Array.isArray(infoSelectedSearchQuery[name]) && infoSelectedSearchQuery[name].includes(value)) return
    if (value !== 'all' && infoSelectedSearchQuery[name] !== 'all') {
      setInfoSelectedSearchQuery(prev => (
        {
          ...prev,
          [name]: [...infoSelectedSearchQuery[name], value]
        }
      ))
    }
    if (value !== 'all' && infoSelectedSearchQuery[name] === 'all') {
      setInfoSelectedSearchQuery(prev => (
        {
          ...prev,
          [name]: [value]
        }
      ))
    }
    if (name === 'type' && value === 'all' && infoSelectedSearchQuery[name] !== 'all' ||
      infoSelectedSearchQuery[name].length + 1 === genres.length - 1
    ) {
      setInfoSelectedSearchQuery(prev => (
        {
          ...prev,
          [name]: 'all'
        }
      ))
    }
    if (infoSelectedSearchQuery[name])
      return false;
  }

  // handle remove infos from selected search query
  const handleRemoveInfosFromSelectedSearchQuery = (e) => {
    const dataName = e.currentTarget.getAttribute('data-name');
    const name = e.currentTarget.getAttribute('name');

    console.log('Remove info:', typeof dataName);

    setInfoSelectedSearchQuery(prev => {

      const newName = prev[dataName].filter(info => info !== name);
      return {
        ...prev,
        [dataName]: newName.length > 0 ? newName : 'all'
      };
    });
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setDropDown(prev => ({ ...prev, profile: false }));
      }
      if (bpmRef.current && !bpmRef.current.contains(e.target)) {
        setDropDown(prev => ({ ...prev, bpm: false }));
      }
      if (typeRef.current && !typeRef.current.contains(e.target)) {
        console.log('contain');

        setDropDown(prev => ({ ...prev, type: false }));
      }
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        console.log('contain');

        setDropDown(prev => ({ ...prev, notif: false }));
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getTitleUser = () => {
    if (user.role === "dj") {
      return <h2 className="title">What are you playing today DJ <span className="name-user">{user.dj_profile.stage_name}</span></h2>
    } else {
      return <h2 className="title">What are you listening to today <span className="name-user">{user.first_name}</span>?</h2>
    }
  }

  const getBpmMessage = (currentLength) => {
    if (currentLength === 0) return `You can enter up to ${maxValuesBPM} values.`;
    if (currentLength < maxValuesBPM) return `You have entered ${currentLength} value${currentLength > 1 ? 's' : ''}. You can add ${maxValuesBPM - currentLength} more.`;
    return `You have reached the maximum of ${maxValuesBPM} values.`;
  };

  const handleChangeInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    setInfoSelectedSearchQuery(prev => (
      {
        ...prev,
        [name]: value
      }
    ))
  }
  const handleErrorBPM = () => {
    const input = infoSelectedSearchQuery.inputBPM;
    let error = '';

    if (!input || input.trim() === '') {
      error = 'BPM is required.';
    } else if (!/^[0-9]+$/.test(input)) {
      error = 'BPM must contain only numbers.';
    } else if (input.length < 3) {
      error = 'BPM must be at least 3 digits.';
    } else if (input.length >= 4) {
      error = 'BPM must not exceed 4 digits.';
    }

    setInfoSelectedSearchQuery(prev => ({
      ...prev,
      errorBPM: error
    }));

    return error === '';
  };
  const handleSubmitBPM = (e) => {
    e.preventDefault()
    const isValid = handleErrorBPM()
    if (!isValid) {
      return
    }
    handleInfoSelectedSearchQuery(e)

  }


  const getGenres = async () => {
    try {
      const res = await api.get('/genres')
      setGenres(res.data.genres)
      setGenres(prev => (
        ['all', ...prev]
      ))


    } catch (err) {
      console.log(err);
    }
  }




  // user useEffect
  useEffect(() => {
    console.log(user);

  }, [user])


  const handleDropDown = (e) => {
    e.stopPropagation();
    const name = e.currentTarget.getAttribute('name');
    if (name === 'expandedSearch' && !dropDown.expandedSearch) {
      setInfoSelectedSearchQuery(prev => ({ ...prev, 'type': 'all', 'bpm': 'all', 'inputBPM': '' }))
    }

    setDropDown(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };




  return (
    <div className="discover">
      <VerificationPopup notifications={notifications} user={user} />
      <main className="main-section">
        <section className="top-section">
          {getTitleUser()}
          <div className={`container-search-bar ${!dropDown.expandedSearch ? ' expanded-search-bar' : ''}`}>

            <i className="bi bi-search"></i>
            <i name="expandedSearch" onClick={handleDropDown} className={`bi bi-arrows-angle${!dropDown.expandedSearch ? '-expand' : '-contract'} arrows-angle  ${dropDown.expandedSearch ? 'expanded' : 'contract'}`}></i>
            <textarea maxLength="80" type="text" name="searchInput" placeholder="search for Dj, Mixes..." />
            <div className="bottom-search-input">
              {dropDown.type && dropDown.expandedSearch && (
                <ul className="drop-down drop-down-type" ref={typeRef}>
                  {
                    genres.map(genre => {
                      return <li key={genre}
                        onClick={handleInfoSelectedSearchQuery}
                        className={`type ${infoSelectedSearchQuery.type === genre ? 'selected' : ''} ${Array.isArray(infoSelectedSearchQuery.type) && infoSelectedSearchQuery.type.includes(genre) ? 'selected' : ''}`} value={genre} name="type" id={genre}>{genre}</li>
                    })
                  }

                </ul>
              )}
              {
                dropDown.bpm && dropDown.expandedSearch && (
                  <form ref={bpmRef} name="bpm" onSubmit={handleSubmitBPM} className="drop-down drop-down-bpm">
                    <div className="container-input">
                      <input value={infoSelectedSearchQuery.inputBPM} type="text" name="inputBPM" onChange={handleChangeInput} placeholder="Enter int value from 100 to 150" />
                    </div>
                    {infoSelectedSearchQuery.errorBPM && <p className="error">{infoSelectedSearchQuery.errorBPM}</p>}
                    <button type="submit">PICK MY BPM</button>
                    {Array.isArray(infoSelectedSearchQuery.bpm) && <p className="message-user-bpm">{getBpmMessage(infoSelectedSearchQuery.bpm.length)}</p>}
                    <div className="line"></div>
                    <div className="infoSelected">
                      {
                        dropDown.expandedSearch && (
                          infoSelectedSearchQuery.bpm === 'all' ? (
                            <p className="info-selected-bpm">
                              ALL
                            </p>
                          ) : Array.isArray(infoSelectedSearchQuery.bpm) ? (
                            infoSelectedSearchQuery.bpm.map((info, index) => (
                              <p key={index} className="info-selected-bpm" >
                                {info}
                                <i class="bi bi-x" name={info} onClick={handleRemoveInfosFromSelectedSearchQuery} data-name='bpm'></i>
                              </p>
                            ))
                          ) : null
                        )
                      }
                    </div>
                  </form>
                )
              }
              <button name="bpm" onClick={handleDropDown} >BPM <i className={`bi bi-chevron-${dropDown.bpm ? 'up' : 'down'}`}></i></button>
              <button name="type" onClick={handleDropDown}>TYPE <i className={`bi bi-chevron-${dropDown.type ? 'up' : 'down'}`}></i></button>
              <div className="infoSelected">
                {
                  dropDown.expandedSearch && (
                    infoSelectedSearchQuery.type === 'all' ? (
                      <p className="info-selected-type">
                        ALL
                      </p>
                    ) : Array.isArray(infoSelectedSearchQuery.type) ? (
                      infoSelectedSearchQuery.type.map((info, index) => (
                        <p key={index} className="info-selected-type" >
                          {info}
                          <i class="bi bi-x" name={info} onClick={handleRemoveInfosFromSelectedSearchQuery} data-name='type'></i>
                        </p>
                      ))
                    ) : null
                  )
                }
              </div>

            </div>
          </div>
        </section>
        <section className="middle-section">
          <section className="left-section-in-middle">
            <RecentlyPlayed />
            <MoreOfWhatYouLike />
          </section>
          <section className="right-section-in-middle">
            <div className="container-more-infos djs-should-follow">
              <DjsShouldFollow />
            </div>
            <footer>
              <Footer />
            </footer>
          </section>
        </section>
      </main>
    </div >
  )
}

export default Discover