import { useState, useEffect, useCallback } from "react"
import api from "@/api"
import NotificationContext from "./NotificationContextObj"

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] =
        useState([])

    const [loadingNotif, setLoadingNotif] =
        useState(false)

    const getNotifications = useCallback(async () => {
        setLoadingNotif(true)

        try {
            const res = await api.get("/notifications")
            setNotifications(res.data)
        } catch (err) {
            console.log(err)
        } finally {
            setLoadingNotif(false)
        }
    }, [])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) return

        const fetchNotifications = async () => {
            await getNotifications()
        }

        fetchNotifications()
    }, [getNotifications])

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications,
                loadingNotif,
                getNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}
