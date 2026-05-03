import './relatedMixItem.css'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function RelatedMixItem({ mixInfo }) {
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))

    const slugify = (text) => {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
    }

    const getMixUrl = () => {
        const trackSlug = slugify(mixInfo.title)
        const djSlug = mixInfo.user_id === user.id
            ? "you"
            : slugify(mixInfo.user.dj_profile.stage_name)

        return `/mix/${djSlug}/${trackSlug}`
    }

    const handleNavigate = () => {
        navigate(getMixUrl())
    }

    return (
        <div className="related-mix-item">
            <div className="left">
                <div className="container-cover">
                    <img
                        src={mixInfo.cover_image}
                        alt="mix cover"
                        onClick={handleNavigate}
                        className="cover-image"
                    />
                </div>
            </div>
            <div className="center">
                <p className="title" onClick={handleNavigate}>{mixInfo.title}</p>
                <p className="type">{mixInfo.type}</p>
                <div className="mix-stats">
                    <div >
                        <span className="plays">{mixInfo.plays_count || 0}</span>
                        <i className="bi bi-play-fill"></i>
                    </div>
                    <div>
                        <span >{mixInfo.likes_count || 0}
                        </span>
                        <i className="bi bi-suit-heart-fill"></i>
                    </div>
                    <div>
                        <span >{mixInfo.comments_count || 0}</span>
                        <i className="bi bi-chat-right-fill"></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RelatedMixItem
