import './djShouldFollow.css'
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

function DjShouldFollow({ djInfo }) {
    return (
        <div className="dj-should-follow">
            <div className="left">
                <div className="container-profile-dj">
                <img src={djInfo.profile_picture} alt="profile dj" />
                </div>
                <p className="stage_name"><em>{djInfo.dj_profile.stage_name}</em></p>
            </div>
            <div className="center">
                <p className="small-desc">{djInfo.dj_profile.bio}</p>
                <div className="section-info-dj">
                    <p className = "followers-count"><i className="bi bi-person-plus-fill"></i>{djInfo.followers_count}</p>
                    <p className = "mixes-count"><MusicNoteListIcon />{djInfo.mixes_count}</p>
                </div>
            </div>
            <button className = "follow-button">Follow</button>
        </div>
    )
}

export default DjShouldFollow