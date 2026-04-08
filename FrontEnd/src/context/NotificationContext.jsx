import { createContext, useContext, useState, useEffect } from "react"
import api from "@/api"

const NotificationContext =
    createContext()

export function NotificationProvider({ children }) {

    const [notifications, setNotifications] =
        useState([])

    const [loadingNotif, setLoadingNotif] =
        useState(false)

    const getNotifications = async () => {

        setLoadingNotif(true)

        try {

            const res =
                await api.get("/notifications")

            setNotifications(res.data)

        } catch (err) {

            console.log(err)

        }

        setLoadingNotif(false)

    }

    useEffect(() => {

        getNotifications()

    }, [])

    return (

        <NotificationContext.Provider
            value={{
                notifications,
                setNotifications,
                loadingNotif,
                getNotifications
            }}
        >

            {children}

        </NotificationContext.Provider>

    )

}

export const useNotifications = () => useContext(NotificationContext)