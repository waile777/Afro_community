import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './mixLikesSection.css'

export default function MixLikesSection({ mix }) {
    const navigate = useNavigate()
    const [showDjCard, setShowDjCard] = useState(false)

    const mixLikesCount = mix?.mix_likes_count || 0
    const djLikesCount = mix?.dj_likes_count || 0

    const handleMixLikesClick = () => {
        // Navigate to likes list page
        navigate(`/mix/${mix?.user?.dj_profile?.stage_name}/${mix?.title}/likes`)
    }

    const handleDjLikesHover = () => {
        if (djLikesCount > 0) {
            setShowDjCard(true)
        }
    }

    const handleDjLikesLeave = () => {
        setShowDjCard(false)
    }

    return (
        <div className="mix-likes-section">
            {/* Mix Likes */}
            <div className="likes-item mix-likes" onClick={handleMixLikesClick}>
                <div className="likes-icon-wrapper">
                    <svg
                        className="likes-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </div>
                <span className="likes-count">{mixLikesCount}</span>
            </div>

            {/* DJ Likes */}
            <div
                className="likes-item dj-likes"
                onMouseEnter={handleDjLikesHover}
                onMouseLeave={handleDjLikesLeave}
            >
                <div className="likes-icon-wrapper dj-wrapper">
                    <svg
                        className="likes-icon dj-icon"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <div className="dj-badge">DJ</div>
                </div>
                <span className="likes-count">{djLikesCount}</span>

                {/* DJ Hover Card */}
                {showDjCard && djLikesCount > 0 && (
                    <DjLikeHoverCard mix={mix} />
                )}
            </div>
        </div>
    )
}

function DjLikeHoverCard({ mix }) {
    return (
        <div className="dj-hover-card">
            <img
                src={mix?.user?.profile_picture}
                alt={mix?.user?.dj_profile?.stage_name}
                className="dj-hover-image"
            />
            <div className="dj-hover-info">
                <p className="dj-hover-name">
                    {mix?.user?.dj_profile?.stage_name || mix?.user?.username}
                </p>
                <div className="dj-hover-followers">
                    <span className="followers-label">Followers</span>
                    <span className="followers-count">
                        {mix?.user?.followers_count || 0}
                    </span>
                </div>
                <button className="dj-hover-follow-btn">Follow</button>
            </div>
        </div>
    )
}
