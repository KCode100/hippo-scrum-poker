import { RoomData } from "@/hooks/useRealtimeDocumentListener"
import { createContext, useContext } from "react"

export const DocumentContext = createContext<null | RoomData>(null)

export const useDocumentContext = () => useContext(DocumentContext)