import './mix.css'
import {
    PlayIcon,
    PauseIcon,
    SkipForwardIcon,
    SkipBackwardIcon,
    RewindIcon,
    FastForwardIcon,
    VolumeUpIcon,
    VolumeDownIcon,
    VolumeMuteIcon,
    VolumeOffIcon,
    MusicNoteIcon,
    MusicNoteListIcon,
    MusicPlayerIcon,
    MusicPlayerFillIcon,
    RepeatIcon,
    ShuffleIcon,
    EjectIcon,
    StopIcon,
    RecordIcon,
    PlaylistAddIcon,
    ShareIcon,
    ThreeDotsVertical,
    ThreeDots
} from "@/assets/musicPlayerIcons/MusicIcon.jsx";
import React from 'react'
import { useEffect, useState } from 'react'




function Mix({ mix, current, play }) {
    const [imgLoaded, setImgLoaded] = useState(false)
    const user = JSON.parse(localStorage.getItem('user'));
    const ownerMix = mix.user_id === user.id

    useEffect(() => {
        console.log('image loded ?' , imgLoaded);
    }, [imgLoaded])


    return (
        <div className={`mix ${current ? ' current' : ''}`}>
            {ownerMix && <span className="my-mix">Owner</span>}
            <div className="container-image">
                {ownerMix && <span className="edit-my-mix"><i className="bi bi-pencil-fill"></i>Edit</span>}
                {current && <button className="play-button button-mix-image"><PlayIcon /></button>}
                <img loading="lazy"  onLoad={() => setImgLoaded(true)} className="cover-image" src={mix.cover_image} alt="Image Mix" />
                {!imgLoaded && <div className={`skeleton`}></div>}
            </div>
            <h5 className="title">{mix.title}</h5>
            <div className="bottom-title">
                <p className="genre">{mix.genre}</p>
                <p className="stage-name">{mix.user.dj_profile.stage_name}</p>
            </div>
            <p className="length-mix">3.02 s</p>
            <div className="line"></div>
            <div className="bottom-mix">
                <button className="play-button"><PlayIcon /></button>
                <div className="right-section">
                    <ShareIcon />
                    <PlaylistAddIcon />
                    <ThreeDotsVertical />
                </div>
            </div>
        </div>
    )
}

export default Mix