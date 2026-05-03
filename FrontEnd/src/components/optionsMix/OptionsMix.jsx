import React from 'react'
import './optionsMix.css'
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
    ThreeDots,
    PlaylistAddIcon,
    HeartIcon,
    ShareIcon
} from "@/assets/musicPlayerIcons/MusicIcon";
import {useState, useEffect} from 'react'

function OptionsMix() {
    const user = JSON.parse(localStorage.getItem("user"));

    const links = [
        { label:"like" , icon : <HeartIcon /> },
        { label: "Share", icon : <ShareIcon /> },
        { label: "other-options", icon : <ThreeDots /> },
    ];

    const [optionClicked , setOptionClicked] = useState({
        like : false,
        share:false,
        'other-options' : false
    })

    const handleClickOption = (e) => {
        const name = e.target.getAttribute('name')
        console.log(name);
        
        setOptionClicked(prev => (
            {
                ...prev ,
                [name] : !prev[name]
            }
        ))
        
    }


        const filteredButtons = links.filter(link => {

        // visible for everyone
        if (!link.roles && !link.auth) return true;

        // hide auth links if no user
        if (link.auth && !user) return false;

        // hide role links if no user
        if (link.roles && !user) return false;

        // check roles
        if (link.roles && user) {
            return link.roles.includes(user.role);
        }

        return true;
    });
  return (
    <div className = "options-mix">
        {
            filteredButtons.map(button => {
                return <div key = {button.label} onClick = {handleClickOption} name = {button.label} className = {`option-mix ${button.label} ${optionClicked[button.label] ? 'clicked' : ''}`}>{button.icon}</div>
            })
        }
    </div>
  )
}

export default OptionsMix