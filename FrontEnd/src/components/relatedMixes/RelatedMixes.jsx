import './relatedMixes.css'
import { useState, useEffect } from 'react'
import RelatedMixItem from '../relatedMixItem/RelatedMixItem'
import api from '../../api.js'
import WaitingApi from "../waitingApi/WaitingApi"
import { useNavigate } from 'react-router-dom'
import React from 'react'

function RelatedMixes({ mixes: propMixes = null, title = "Related Tracks", limit = null }) {

    const [mixes, setMixes] = useState(() => propMixes || [])
    const [apiState, setApiState] = useState(() => propMixes ? 'success' : 'idle')
    const navigate = useNavigate()

    useEffect(() => {
        // If mixes are provided via props, don't fetch
        if (propMixes && propMixes.length > 0) {
            return
        }

        async function fetchRelatedMixes() {
            setApiState('loading')
            try {
                // Try to fetch from /more-of-what-you-like as an alternative
                const res = await api.get('/more-of-what-you-like');
                let data = res.data || []
                
                // Apply limit if specified
                if (limit && data.length > limit) {
                    data = data.slice(0, limit)
                }
                
                setMixes(data);
                setApiState(data.length > 0 ? 'success' : 'empty')

            } catch (error) {
                console.error('Error fetching related mixes:', error);
                setApiState('error')
            }
        }

        if (!propMixes) {
            fetchRelatedMixes();
        }
    }, [propMixes, limit]);

    const handleViewAll = () => {
        navigate('/related-mixes');
    }

    if (apiState === 'empty' || (mixes && mixes.length === 0)) {
        return null
    }

    return (
        <div className="related-mixes">
            <div className="top-section">
                <h5 className="title">{title}</h5>
                <p className="view-all" onClick={handleViewAll}>View all</p>
            </div>
            {
                apiState === "loading" && (
                    <WaitingApi />
                )
            }
            {
                (apiState === "success" || mixes.length > 0) && (
                    <div className="mixes-container">
                        {mixes?.map((mixInfo, i) => {
                            return <RelatedMixItem key={i} mixInfo={mixInfo} />
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default RelatedMixes
