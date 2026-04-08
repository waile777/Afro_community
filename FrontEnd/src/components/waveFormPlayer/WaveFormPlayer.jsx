import React, { useRef, useEffect, useState } from "react"
import WaveSurfer from "wavesurfer.js"

export default function WaveformPlayer({ audioUrl }) {

    const waveformRef = useRef(null)
    const wavesurfer = useRef(null)

    const [isReady, setIsReady] = useState(false)

    useEffect(() => {

        if (!audioUrl) return

        setIsReady(false)

        if (wavesurfer.current) {
            wavesurfer.current.destroy()
        }

        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#ccc",
            progressColor: "#ff5500",
            cursorColor: "#ff5500",
            height: 80,
            responsive: true
        })

        wavesurfer.current.load(audioUrl)

        wavesurfer.current.on("ready", () => {
            setIsReady(true)
        })

        return () => {
            if (wavesurfer.current) {
                wavesurfer.current.destroy()
                wavesurfer.current = null
            }
        }

    }, [audioUrl])

    const playPause = () => {
        wavesurfer.current.playPause()
    }


    return (
        <div>

            <div ref={waveformRef} />

            <button
                disabled={!isReady}
                onClick={playPause}
            >
                Play / Pause
            </button>

        </div>
    )
}