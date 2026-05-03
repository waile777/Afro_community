import { useContext } from "react"
import NotificationContext from "./NotificationContextObj"

export function useNotifications() {
  return useContext(NotificationContext)
}
