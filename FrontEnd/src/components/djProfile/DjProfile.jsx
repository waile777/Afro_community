import React, { useEffect, useState } from 'react'
import api from '../../api.js'
import './djProfile.css'

export default function DjProfile({ mix }) {
    const [isFollowing, setIsFollowing] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!mix?.user?.id) return

        const checkFollowStatus = async () => {
            try {
                setLoading(true)
                const followRes = await api.get(`/Dj/${mix.user.id}/is_following`)
                setIsFollowing(followRes.data.is_following || false)
            } catch (error) {
                console.error('Error checking follow status:', error)
                setIsFollowing(false)
            } finally {
                setLoading(false)
            }
        }

        checkFollowStatus()
    }, [mix?.user?.id])

    const handleFollowToggle = async () => {
        try {
            if (isFollowing) {
                await api.delete(`/Dj/${mix.user.id}/unfollow`)
                setIsFollowing(false)
            } else {
                await api.post(`/Dj/${mix.user.id}/follow`)
                setIsFollowing(true)
            }
        } catch (error) {
            console.error('Error toggling follow:', error)
        }
    }

    if (!mix?.user) return null

    // Get counts from mix.user data (already loaded)
    const followersCount = mix.user.followers_count || 0
    const mixesCount = mix.user.mixes_count || 0

    return (
        <div className="dj-profile-card">
            <img 
                src={mix.user.profile_picture} 
                alt={mix.user.dj_profile?.stage_name} 
                className="dj-profile-image"
            />
            
            <h4 className="dj-stage-name">
                {mix.user.dj_profile?.stage_name || mix.user.username}
            </h4>

            <div className="dj-stats">
                <div className="stat-item">
                    <span className="stat-label">Mixes</span>
                    <span className="stat-value">{mixesCount}</span>
                </div>
                <div className="stat-item">
                    <span className="stat-label">Followers</span>
                    <span className="stat-value">{followersCount}</span>
                </div>
            </div>

            <button 
                className={`dj-follow-btn ${isFollowing ? 'following' : ''}`}
                onClick={handleFollowToggle}
                disabled={loading}
            >
                {isFollowing ? 'Following' : 'Follow'}
            </button>

            <a href="#report" className="dj-report-link">Report</a>
        </div>
    )
}
