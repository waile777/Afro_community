import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import './header.css'
import NavLinks from "@/components/navLinks/NavLinks"
import DropDownProfile from "@/components/dropDownProfile/DropDownProfile"
import DropDownNotification from "@/components/dropDownNotification/DropDownNotification"
import VerificationBanner from "@/components/verificationBanner/VerificationBanner"

import logoWithoutName from "@/assets/logo/logo_bold_without_name.svg"

import { useNotifications }
    from "@/context/NotificationContext"

function Header() {

    const navigate = useNavigate()

    const profileRef = useRef()
    const notifRef = useRef()

    const user =
        JSON.parse(localStorage.getItem('user'))

    const {
        notifications,
        setNotifications,
        loadingNotif,
        getNotifications
    } = useNotifications()

    const [dropDown, setDropDown] =
        useState({
            profile: false,
            notif: false,
            options: false
        })

    const verificationNotif =
        notifications.find(n =>
            n.data.type ===
            "verification_required"
        )

    const hasUnreadNormalNotif =
        notifications.some(n =>
            !n.read_at &&
            n.data.type !==
            "verification_required"
        )

    const showBadge =
        hasUnreadNormalNotif ||
        verificationNotif

    const openNotifDropdown =
        async () => {

            setDropDown(prev => ({
                ...prev,
                notif: !prev.notif
            }))

            const normalUnread =
                notifications.filter(n =>
                    !n.read_at &&
                    n.data.type !==
                    "verification_required"
                )

            if (normalUnread.length) {

                await api.post(
                    "/notifications/read-normal"
                )

                setNotifications(prev =>
                    prev.map(n =>
                        n.data.type !==
                            "verification_required"

                            ? {
                                ...n,
                                read_at: new Date()
                            }

                            : n
                    )
                )

            }

        }

    useEffect(() => {

        const handleClickOutside =
            (e) => {

                if (
                    profileRef.current &&
                    !profileRef.current.contains(e.target)
                ) {

                    setDropDown(prev => ({
                        ...prev,
                        profile: false
                    }))

                }

                if (
                    notifRef.current &&
                    !notifRef.current.contains(e.target)
                ) {

                    setDropDown(prev => ({
                        ...prev,
                        notif: false
                    }))

                }

            }

        document.addEventListener(
            "mousedown",
            handleClickOutside
        )

        return () => {

            document.removeEventListener(
                "mousedown",
                handleClickOutside
            )

        }

    }, [])

    return (

        <header>

            <VerificationBanner
                notifications={notifications}
            />

            <img
                src={logoWithoutName}
                className="left-section"
                onClick={() =>
                    navigate("/discover")
                }
            />

            {dropDown.profile &&

                <ul
                    ref={profileRef}
                    className="drop-down drop-down-profile"
                >

                    <DropDownProfile />

                </ul>

            }

            {dropDown.notif &&

                <div
                    className="drop-down drop-down-notification"
                    ref={notifRef}
                >

                    <div className="top">

                        <h3>
                            Notifications
                        </h3>

                        <span
                            onClick={getNotifications}
                        >

                            {
                                loadingNotif
                                    ? "Loading..."
                                    : "Refresh"
                            }

                        </span>

                    </div>

                    <DropDownNotification
                        notifications={notifications}
                    />

                </div>

            }

            <NavLinks />

            <div className="right-section">

                <div className="profile-section">

                    <img
                        src={user.profile_picture}
                        name="profile"
                        onClick={() =>
                            setDropDown(p => ({
                                ...p,
                                profile: !p.profile
                            }))
                        }
                    />
                    <i name="profile" className={`bi bi-chevron-${dropDown.profile ? 'up clicked' : 'down'}`} onClick={() =>
                        setDropDown(p => ({
                            ...p,
                            profile: !p.profile
                        }))
                    }></i>
                </div>

                <div className="other-section">
                    <div className="notif-section">
                        <i
                            className={`bi bi-bell-fill${dropDown.notif ? " clicked" : ""}`}
                            onClick={openNotifDropdown}
                            name="notif"
                        />

                        {showBadge &&
                            <div className="notif-badge" />
                        }
                    </div>
                    <div className="other-options">
                        <i name="options" className={`bi bi-three-dots-vertical ${dropDown.options ? ' clicked' : ''}`} onClick={() =>
                            setDropDown(p => ({
                                ...p,
                                options: !p.options
                            }))
                        }></i>
                    </div>
                </div>



            </div>

        </header>

    )

}

export default Header