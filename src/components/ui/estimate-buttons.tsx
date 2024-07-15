import { useEffect, useState } from "react"
import ErrorAlert from "./error-alert"
import { Player } from "@/hooks/useRealtimeDocumentListener"
import { doc, updateDoc } from "firebase/firestore"
import { db } from "@/lib/firebase/config"
import { useDocumentContext } from "@/app/contexts/documentContext"

type Props = {
  currentPlayer: Player
  roomId: string
}

const estimationOptions: string[] = ["?", "☕", "0", "0.5", "1", "2", "3", "5", "8", "13", "21", "34", "55", "89"]

const EstimateButtons = ({ currentPlayer, roomId }: Props) => {
  const document = useDocumentContext()
  const [selectedOption, setSelectedOption] = useState<undefined | string>(undefined)
  const [error, setError] = useState(false)

  async function handleUpdateScore(selectedValue: string) {
    setSelectedOption(selectedValue)
    try {
      if (document && document.players) {
        const playersList = [...document.players]
        const playerIndex = playersList.findIndex((player) => player.id === currentPlayer.id)
        playersList[playerIndex].points = selectedValue

        const ref = doc(db, "rooms", roomId)
        await updateDoc(ref, { players: playersList })
      }
    } catch (error) {
      // Handle any errors that occur during document creation
      console.error("Error creating document:", error)
      setError(true)
    }
  }

  useEffect(() => {
    if (document) {
      // Auto select user's pre-existing points
      const currentPlayerPoints = document.players.find((player) => player.id === currentPlayer.id)?.points
      setSelectedOption(currentPlayerPoints)
    }
  }, [document])

  return (
    <div className="max-w-4xl flex flex-wrap gap-6 justify-evenly py-12">
      {estimationOptions.map((option) => (
        <button
          key={option}
          className={`h-[100px] w-[80px] transition-all ease-in duration-150 font-medium text-3xl rounded-lg shadow-md ${
            selectedOption === option
              ? "bg-hippo-brand-green text-hippo-brand-grey"
              : "bg-white hover:bg-gray-100 text-hippo-brand-navy focus:outline-none focus:ring-2 focus:ring-hippo-brand-green"
          }`}
          onClick={() => handleUpdateScore(option)}
        >
          {option}
        </button>
      ))}
      {error && <ErrorAlert callback={() => setError(false)} />}
    </div>
  )
}

export default EstimateButtons
