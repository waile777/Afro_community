import './dropDownNotification.css'

import React from 'react'
import { Link } from 'react-router-dom'
function DropDownNotification({ notifications }) {
    const verificationNotif =
        notifications.find(n =>
            n.data.type === "verification_required"
        )

    return (
        <>
            {
                notifications.length > 0 ?
                    <>
                        {
                            notifications.map((notif, i) => {
                                return (
                                    <>
                                        <p className="notification">{notif.data.title}</p>
                                        {
                                            notifications.length - 1 > i && <div className="line"></div>
                                        }
                                    </>
                                )
                            })
                        }
                        <Link  to={'/notificatons'}>View All notifications</Link>
                    </>

                    :
                    (
                        <div className="notification-empty">
                            <p>No Notifications</p>
                            <Link className="link-notif" to={'/notificatons'}>View All notifications</Link>
                        </div>
                    )
            }
        </>
    )
}

export default DropDownNotification