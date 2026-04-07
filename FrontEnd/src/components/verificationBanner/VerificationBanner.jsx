import { useState, useEffect } from "react"
import "./verificationBanner.css"

export default function VerificationBanner({
    notifications
}) {

    const [show, setShow] = useState(true)

    const verificationNotif =
        notifications.find(n =>
            n.data.type === "verification_required"
        )

    if (!verificationNotif || !show)
        return null

    return (

        <div className="verification dj-under-two-mixes">

            <p>

                {verificationNotif.data.message}

                <a href={verificationNotif.data.link}>
                    Upload Track Right Now
                </a>

            </p>

            <button
                className="remove-pooup"

                onClick={() => setShow(false)}
            >

                ×

            </button>

        </div>

    )
}