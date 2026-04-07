import { useState, useEffect } from "react"
import './verificationPopup.css'
import api from '../../api.js'
import { Link, useNavigate } from 'react-router-dom'
export default function VerificationPopup({ notifications, user }) {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [showOverlay, setShowOverlay] = useState(false);
    const verificationNotif =
        notifications.find(n => n.data.type === "verification_required" && !n.read_at)

    useEffect(() => {
        if (verificationNotif) {
            
            setShow(true)
        }
    }, [verificationNotif])

    if (!show || !verificationNotif) return null

    const markAsRead = async () => {
        setShow(false)
        try {
            await api.post(`/notifications/${verificationNotif.id}/read`)
        } catch (err) {
            console.log(err)
        }
    }
    const handleClickUpload = () => {
        markAsRead()
        navigate('/upload')
    }

    return (
        <>
            <div className={`overlay ${showOverlay && ' active'}`}></div>
            <div className="verification-popup">
                <button className="close-popup" onClick={markAsRead}>
                    ×
                </button>
                <section className="profile">
                    <img src={user.profile_picture} alt="profile Dj" />
                    <p>DJ <span>{user.dj_profile.stage_name}</span></p>
                </section>
                <section className="context">
                    <h4>Account Verification</h4>
                    <p>Your DJ account is under verification...
                        What does this mean ?
                    </p>
                    <span><i class="bi bi-file-earmark-arrow-up-fill"></i>You can upload 2 track for review.</span>
                </section>
                <section className="check-team">
                    <h5>our team will check</h5>
                    <ol>
                        <li>Audio Quality</li>
                        <li>CopyRight Compliance</li>
                        <li>Content safety</li>
                    </ol>
                </section>
                <button className="upload" onClick={handleClickUpload}>
                    Upload Track For Verification
                </button>
                <Link to={'/discover'} onClick={markAsRead}>go to my account page</Link>

            </div>
        </>

    )
}