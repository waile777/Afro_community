import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api.js'
import './mixLikesSection.css'

export default function MixLikesSection({ mix }) {
    const navigate = useNavigate()
    const [showDjLikersCard, setShowDjLikersCard] = useState(false)
    const [djLikers, setDjLikers] = useState([])
    const [loading, setLoading] = useState(false)

    const mixLikesCount = mix?.mix_likes_count || 0
    const djLikesCount = mix?.dj_likes_count || 0

    const handleMixLikesClick = () => {
        navigate(`/mix/${mix?.user?.dj_profile?.stage_name}/${mix?.title}/likes`)
    }

    const handleDjLikesClick = async () => {
        if (djLikesCount === 0) return

        if (!showDjLikersCard && djLikers.length === 0) {
            setLoading(true)
            try {
                const res = await api.get(`/mix/${mix?.id}/dj-likers`)
                setDjLikers(res.data?.dj_likers || [])
            } catch (error) {
                console.error('Error fetching DJ likers:', error)
                setDjLikers([])
            } finally {
                setLoading(false)
            }
        }
        setShowDjLikersCard(!showDjLikersCard)
    }

    return (
        <div className="mix-likes-section">
            <div className="likes-item mix-likes all" onClick={handleMixLikesClick}>
                <span className="likes-count all">{mixLikesCount}</span>
                <div className="likes-icon-wrapper all">
                    <svg className="likes-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                </div>
            </div>

            <div className="likes-item dj-likes" onClick={handleDjLikesClick}>
                <span className="likes-count">{djLikesCount}</span>
                <div className="likes-icon-wrapper dj-wrapper">
                    <svg className="likes-icon dj-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <div className="dj-badge">DJ</div>
                </div>

                {showDjLikersCard && (
                    <DjLikersCard
                        djLikers={djLikers}
                        loading={loading}
                        mix={mix}
                        onShowAll={() => {
                            setShowDjLikersCard(false)
                            navigate(`/mix/${mix?.user?.dj_profile?.stage_name}/${mix?.title}/dj-likers`)
                        }}
                    />
                )}
            </div>
        </div>
    )
}

function DjLikersCard({ djLikers, loading, mix, onShowAll }) {
    const navigate = useNavigate()
    const [hoveredDjId, setHoveredDjId] = useState(null)
    const displayedDJs = djLikers.slice(0, 4)

    const handleDjClick = (stageName) => {
        navigate(`/dj/${stageName}`)
    }

    return (
        <div className="dj-likers-card">
            <div className="dj-likers-list">
                {loading ? (
                    <div className="dj-loading">Loading...</div>
                ) : displayedDJs.length === 0 ? (
                    <div className="dj-empty">No DJ likes yet</div>
                ) : (
                    displayedDJs.map((dj, index) => (
                        <div key={dj.id} className="dj-liker-item">
                            <div
                                className="dj-liker-content"
                                onMouseEnter={() => setHoveredDjId(dj.id)}
                                onMouseLeave={() => setHoveredDjId(null)}
                            >
                                <img
                                    src={dj.profile_picture}
                                    alt={dj.dj_profile?.stage_name}
                                    className="dj-liker-image"
                                    onClick={() => handleDjClick(dj.dj_profile?.stage_name)}
                                    style={{ cursor: 'pointer' }}
                                />
                                <div className="dj-liker-info">
                                    <p className="dj-liker-name"
                                        onClick={() => handleDjClick(dj.dj_profile?.stage_name)}
                                        style={{ cursor: 'pointer' }}>
                                        <em>DJ</em> {dj.dj_profile?.stage_name}
                                    </p>
                                </div>

                                {hoveredDjId === dj.id && (
                                    <DjLikeHoverCard dj={dj}  />
                                )}
                            </div>
                            {index < displayedDJs.length - 1 && <div className="dj-divider" />}
                        </div>
                    ))
                )}
            </div>

            {djLikers.length > 4 && (
                <div className="dj-show-all">
                    <button onClick={onShowAll} className="dj-show-all-btn">
                        Show all ({djLikers.length})
                    </button>
                </div>
            )}
        </div>
    )
}

function DjLikeHoverCard({ dj }) {
    return (
        <div className="dj-like-hover-card">
            <img
                src={dj?.profile_picture}
                alt={dj?.dj_profile?.stage_name}
                className="dj-like-hover-image"
            />
            <div className="dj-like-hover-info">
                <p className="dj-like-hover-name">
                    {dj?.dj_profile?.stage_name || dj?.username}
                </p>
                <div className="dj-like-hover-followers">
                    <span className="dj-followers-label">Followers</span>
                    <span className="dj-followers-count">
                        {dj?.followers_count || 0}
                    </span>
                </div>
                <button className="dj-like-hover-follow-btn">Follow</button>
            </div>
        </div>
    )
}
