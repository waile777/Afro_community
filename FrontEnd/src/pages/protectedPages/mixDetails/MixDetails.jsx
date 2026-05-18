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
    RecordIcon,
    ThreeDots,
    PlaylistAddIcon
} from "@/assets/musicPlayerIcons/MusicIcon";
import logoWithoutName from "@/assets/logo/logo_bold_without_name.svg"

import React, { useEffect, useState, useRef } from 'react'
import WaveformPlayer from "@/components/waveFormPlayer/WaveformPlayer"
import OptionMix from "@/components/optionsMix/OptionsMix"
import DjProfile from "@/components/djProfile/DjProfile"
import MixLikesSection from "@/components/mixLikesSection/MixLikesSection"
import Comments from "@/components/comments/Comments.jsx"
import RelatedMixes from '@/components/relatedMixes/RelatedMixes'
import Footer from "@/components/footer/Footer"

function MixDetails() {
    const [mix, setMix] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [commentInput, setCommentInput] = useState('')
    const [savingComment, setSavingComment] = useState(false)
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('user'))
        } catch {
            return null
        }
    })
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

    const handleSendComment = async (event) => {
        event.preventDefault()
        console.log('handle');

        if (!commentInput.trim() || !mix?.id) return

        setSavingComment(true)
        try {
            const response = await api.post(`/mix/${mix.id}/comment`, {
                content: commentInput.trim(),
            })

            const newComment = response.data
            setMix((prevMix) => ({
                ...prevMix,
                comments: [newComment, ...(prevMix?.comments || [])],
            }))
            setCommentInput('')
        } catch (error) {
            console.error('Error creating comment:', error)
        } finally {
            setSavingComment(false)
        }
    }

    const handleUpdateComment = async (commentId, updatedContent) => {
        if (!updatedContent.trim()) return
        try {
            const response = await api.patch(`/mix/comment/${commentId}`, {
                content: updatedContent.trim(),
            })
            const updatedComment = response.data.comment
            setMix((prevMix) => ({
                ...prevMix,
                comments: prevMix.comments.map((comment) =>
                    comment.id === commentId ? updatedComment : comment
                ),
            }))
        } catch (error) {
            console.error('Error updating comment:', error)
        }
    }

    const handleDeleteComment = async (commentId) => {
        try {
            await api.delete(`/mix/comment/${commentId}`)
            setMix((prevMix) => ({
                ...prevMix,
                comments: prevMix.comments.filter((comment) => comment.id !== commentId),
            }))
        } catch (error) {
            console.error('Error deleting comment:', error)
        }
    }

    const formatDate = (dateString) => {
        if (!dateString) return ''
        try {
            const date = new Date(dateString.replace(' ', 'T').replace(/(\d{4}-\d{2}-\d{2})(\d{2}:\d{2}:\d{2})/, '$1T$2'))
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })
        } catch (error) {
            return dateString
        }
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
                                <p className="genre">#{mix?.genre}</p>
                            </div>
                            <p className="created_at">Released: {formatDate(mix?.created_at)}</p>
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
                        <img src={currentUser?.profile_picture || mix?.user.profile_picture} alt="profile picture user" />
                        <form className="comment-form" onSubmit={handleSendComment}>
                            <input
                                type="text"
                                placeholder="Share what you feel right now"
                                name="comment"
                                className="comment-input"
                                value={commentInput}
                                onChange={(event) => setCommentInput(event.target.value)}
                            />
                            <button className={`send-comment ${commentInput.trim() !== "" && "active"}`} type="submit" disabled={!commentInput.trim() || savingComment}>
                                <i className="bi bi-send-fill"></i>
                            </button>
                        </form>
                    </section>
                    <section className="options-mix">
                        <div className="left">
                            <OptionMix />

                        </div>
                        <div className="right right-section-likes">
                            {mix && <MixLikesSection mix={mix} />}
                        </div>
                    </section>
                    <section className="profile_dj_comments">
                        <div className="left">
                            {mix && <DjProfile mix={mix} />}
                        </div>
                        <div className="right">
                            {mix && (
                                <Comments
                                    comments={mix.comments || []}
                                    currentUserId={currentUser?.id}
                                    onUpdateComment={handleUpdateComment}
                                    onDeleteComment={handleDeleteComment}
                                />
                            )}
                        </div>
                    </section>
                </div>
                <div className="right">
                    <RelatedMixes title="Similare Mixes" limit={3} />
                    <footer>
                        <Footer />
                    </footer>
                </div>

            </div>
            <img className = "logo-without-name" src={logoWithoutName}/>
        </div>
    )


}

export default MixDetails