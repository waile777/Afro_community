import React, { useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react"
import WaveSurfer from "wavesurfer.js"
import "./WaveFormPlayer.css"

const formatTime = (seconds) => {
    if (!seconds || Number.isNaN(seconds)) return "00:00"
    const minutes = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

const WaveformPlayer = forwardRef(function WaveformPlayer({ audioUrl, onPlayStateChange }, ref) {

    const waveformRef = useRef(null)
    const wavesurfer = useRef(null)

    const [isReady, setIsReady] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [hoverProgress, setHoverProgress] = useState(null)
    const [hoverTime, setHoverTime] = useState(0)

    useImperativeHandle(ref, () => ({
        playPause: () => {
            if (wavesurfer.current && isReady) {
                wavesurfer.current.playPause()
            }
        },
        isPlaying: () => wavesurfer.current ? wavesurfer.current.isPlaying() : false
    }))

    const displayTime = hoverProgress !== null ? hoverTime : currentTime

    const handleWaveformHover = (event) => {
        if (!wavesurfer.current || !duration) return
        const rect = waveformRef.current.getBoundingClientRect()
        const progress = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1)
        setHoverProgress(progress)
        setHoverTime(progress * duration)
    }

    const handleWaveformLeave = () => {
        setHoverProgress(null)
  
    }

    useEffect(() => {

        if (!audioUrl) return

        setIsReady(false)
        setCurrentTime(0)
        setDuration(0)

        if (wavesurfer.current) {
            const destroyPromise = wavesurfer.current.destroy();
            if (destroyPromise && typeof destroyPromise.catch === 'function') {
                destroyPromise.catch(() => {});
            } else {
                wavesurfer.current.destroy();
            }
            wavesurfer.current = null
        }

        wavesurfer.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "rgba(255,255,255,0.2)",
            progressColor: "rgba(214, 207, 255, 0.96)",
            cursorColor: "#ffffff5f",
            barWidth: 2.7,
            height: 110,
            responsive: true,
            cursorWidth : 2,
            normalize : true
        })

        wavesurfer.current.load(audioUrl)

        wavesurfer.current.on("ready", () => {
            setIsReady(true)
            setDuration(wavesurfer.current.getDuration())
        })

        wavesurfer.current.on("audioprocess", () => {
            setCurrentTime(wavesurfer.current.getCurrentTime())
        })

        wavesurfer.current.on("seek", () => {
            setCurrentTime(wavesurfer.current.getCurrentTime())
        })

        if (onPlayStateChange) {
            wavesurfer.current.on('play', () => onPlayStateChange(true))
            wavesurfer.current.on('pause', () => onPlayStateChange(false))
            wavesurfer.current.on('finish', () => onPlayStateChange(false))
        }

        return async () => {
            if (wavesurfer.current) {
                try {
                    const destroyPromise = wavesurfer.current.destroy();
                    if (destroyPromise && typeof destroyPromise.catch === 'function') {
                        await destroyPromise;
                    } else {
                        wavesurfer.current.destroy();
                    }
                } catch (error) {
                    // Ignore errors
                }
                wavesurfer.current = null
            }
        }

    }, [audioUrl, onPlayStateChange])

    return (
        <div className="waveform-container">
            <div
                className="waveform-bar"
                ref={waveformRef}
                onMouseMove={handleWaveformHover}
                onMouseLeave={handleWaveformLeave}
            >
                {hoverProgress !== null && (
                    <>
                        <div
                            className="waveform-hover-preview"
                            style={{ width: `${hoverProgress * 100}%` }}
                        />
                        <div
                            className="waveform-hover-marker"
                            style={{ left: `${hoverProgress * 100}%` }}
                        />
                    </>
                )}
            </div>
            <div className="timeline">
                <span>{formatTime(displayTime)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
    )
})

export default WaveformPlayer