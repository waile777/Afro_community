import { Outlet } from "react-router-dom"
import Header from "@/components/Header"
import { NotificationProvider } from "@/context/NotificationContext"

function MainLayout() {

    return (
        <NotificationProvider>
            <Header />
            <Outlet />
        </NotificationProvider>
    )

}

export default MainLayout