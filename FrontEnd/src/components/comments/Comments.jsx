import './comments.css'
import React, { useState, useEffect } from 'react'

function Comments({ comments = [], currentUserId, onUpdateComment, onDeleteComment }) {
    const [sortedBy, setSortedBy] = useState('Newest')
    const [showDropDownSorted, setShowDropDownSorted] = useState(false)
    const sortOptions = [
        { label: 'Newest' },
        { label: 'Oldest' }
    ]

    const sortedComments = [...comments].sort((a, b) => {
        const aTime = new Date(a.created_at).getTime()
        const bTime = new Date(b.created_at).getTime()

        if (sortedBy === 'Newest') {
            return bTime - aTime
        }

        return aTime - bTime
    })

    const formatTimeAgo = (dateString) => {
        const now = new Date()
        const commentDate = new Date(dateString)
        const seconds = Math.floor((now - commentDate) / 1000)

        if (seconds < 60) return `${seconds} sec ago`
        const minutes = Math.floor(seconds / 60)
        if (minutes < 60) return `${minutes} min ago`
        const hours = Math.floor(minutes / 60)
        if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`
        const days = Math.floor(hours / 24)
        if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`
        const weeks = Math.floor(days / 7)
        if (weeks < 4) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`
        const months = Math.floor(days / 30)
        if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`
        const years = Math.floor(days / 365)
        return `${years} year${years !== 1 ? 's' : ''} ago`
    }

    return (
        <div className="comments">
            <div className="top">
                <h5 className="count-comments">{comments.length} {comments.length >= 2 ? 'comments' : 'comment'}</h5>
                <div className="dropdown-wrapper" onClick={() => setShowDropDownSorted(!showDropDownSorted)}>
                    <div className="dropdown-label">
                        Sorted By: <span className="dropdown-value">{sortedBy}</span>
                        {!showDropDownSorted ? <i className="bi bi-caret-down-fill" /> : <i className="bi bi-caret-up-fill" />}
                    </div>
                    {showDropDownSorted && (
                        <div className="drop-down-sorted">
                            {sortOptions.map(sort => (
                                <p
                                    key={sort.label}
                                    className={`sort-by ${sort.label === sortedBy ? 'active' : ''}`}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        setSortedBy(sort.label)
                                        setShowDropDownSorted(false)
                                    }}
                                >
                                    {sort.label}
                                </p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
            <div className="bottom">
                {sortedComments.map((comment) => (
                    <CommentRow
                        key={comment.id}
                        comment={comment}
                        currentUserId={currentUserId}
                        formatTimeAgo={formatTimeAgo}
                        onUpdateComment={onUpdateComment}
                        onDeleteComment={onDeleteComment}
                    />
                ))}
            </div>
        </div>
    )
}

function CommentRow({ comment, currentUserId, formatTimeAgo, onUpdateComment, onDeleteComment }) {
    const { user, content, created_at } = comment
    const isDj = Boolean(user?.dj_profile)
    const isOwner = currentUserId && user?.id === currentUserId
    const [isEditing, setIsEditing] = useState(false)
    const [editText, setEditText] = useState(content)

    useEffect(() => {
        setEditText(content)
    }, [content])

    const handleSave = async () => {
        if (!editText.trim()) return
        await onUpdateComment(comment.id, editText)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setIsEditing(false)
        setEditText(content)
    }

    return (
        <div className="comment-row">
            <img
                className="comment-avatar"
                src={user?.profile_picture}
                alt={`${user?.first_name}'s avatar`}
            />
            <div className="comment-body">
                <div className="comment-header-row">
                    <div className="comment-user-meta">
                        <div className="comment-name-row">
                            <span className="comment-first-name">{user?.first_name || 'Anonymous'}</span>
                            <span className="comment-time">{formatTimeAgo(created_at)}</span>
                        </div>
                        {isDj && (
                            <div className="comment-dj-row">
                                <span className="comment-stage-name">{user.dj_profile.stage_name}</span>
                                <span className="comment-dj-badge">DJ</span>
                            </div>
                        )}
                    </div>
                    {isOwner && (
                        <div className="comment-actions">
                            {isEditing ? (
                                <>
                                    <button type="button" className="comment-btn save" onClick={handleSave}>Save</button>
                                    <button type="button" className="comment-btn cancel" onClick={handleCancel}>Cancel</button>
                                </>
                            ) : (
                                <>
                                    <button type="button" className="comment-btn edit" onClick={() => setIsEditing(true)}>Edit</button>
                                    <button type="button" className="comment-btn remove" onClick={() => onDeleteComment(comment.id)}>Remove</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
                {isEditing ? (
                    <textarea
                        className="comment-edit-textarea"
                        value={editText}
                        onChange={(event) => setEditText(event.target.value)}
                        rows={3}
                    />
                ) : (
                    <p className="comment-text">{content}</p>
                )}
            </div>
        </div>
    )
}

export default Comments