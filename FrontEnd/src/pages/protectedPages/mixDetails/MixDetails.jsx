import './mixDetails.css'
import { useParams } from 'react-router-dom'
import api from '../../../api.js'
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
    RecordIcon
} from "@/assets/musicPlayerIcons/MusicIcon";
import React, { useEffect, useState, useRef } from 'react'
import WaveformPlayer from "@/components/waveFormPlayer/WaveformPlayer"


function MixDetails() {
    const [mix, setMix] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [colors, setColors] = useState([[200, 200, 200], [100, 100, 100]])
    const waveformRef = useRef(null)
    const { dj, track } = useParams()
    const getMix = async () => {
        try {
            const res = await api.get(
                `/mix/${dj}/${track}`
            )
            setMix(res.data)
            console.log(res.data);


        } catch (error) {
            console.log(error);

        }

    }
    useEffect(() => {
        getMix()
    }, [])

    useEffect(() => {
        console.log(mix);
    }, [mix])


    const handlePlayPause = () => {
        waveformRef.current?.playPause()
    }





    return (
        <div className="mix-details" >
            {
                mix ? (
                    <div className="container-mix-details-top" >
                        <div className="top">
                            <div className="left">
                                <h3 className="title">{mix?.title}</h3>
                                <p className="stage_name">{mix?.user?.dj_profile.stage_name}</p>
                                <button onClick={handlePlayPause}>
                                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                                </button>
                            </div>
                            <img src={mix?.cover_image} className="right cover-image" alt="" />
                        </div>
                        <div className="bottom">
                            {
                                mix &&
                                <WaveformPlayer 
                                    audioUrl={mix?.audio_file} 
                                    ref={waveformRef}
                                    onPlayStateChange={setIsPlaying}
                                />
                            }
                        </div>
                    </div>
                )
                    :
                    (
                        <div></div>
                    )
            }

            <div className="middle-section">
                <div className="left">
                    <section className="comment-section">
                        <img src={mix?.user.profile_picture} alt="profile picture user" />
                        <input type="text" placeholder="Share what you Fell right Now" name="comment" className="comment-input" />
                        <button className="send-comment" name="send-comment"><RecordIcon /></button>
                    </section>
                </div>
                <div className="right">
                    this is the right section
                </div>
            </div>
        </div>
    )


}

export default MixDetails