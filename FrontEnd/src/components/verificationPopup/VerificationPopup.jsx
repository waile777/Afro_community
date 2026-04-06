import { useState, useEffect } from 'react';
import './verificationPopup.css'
export default function VerificationPopup({ user }) {
    const [showVerificationDjUnderTwoMix, setShowVerificationDjUnderTwoMix] = useState(false);

    useEffect(() => {
        if (user.role === 'dj' && user.dj_profile.verification_status === 'pending' && user.mixes.length < 2) {
            setShowVerificationDjUnderTwoMix(true);
        }

    }, [user]);
    if (!showVerificationDjUnderTwoMix) return null;


    return (
        <div className="verification dj-under-two-mixes">
            <p className="">
                To get your account verified, please upload two original tracks.
                Once approved, you can upload unlimited mixes and create events. <a href="/upload">Upload Track Right Now</a>
            </p>
            <button className="remove-pooup" onClick={() => setShowVerificationDjUnderTwoMix(false)}>×</button>
        </div>
    );
}