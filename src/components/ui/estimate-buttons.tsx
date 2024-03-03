import { useDocumentContext } from "@/app/room/[id]/page";
import { useState } from "react";
import ErrorAlert from "./error-alert";
import { Player } from "@/hooks/useRealtimeDocumentListener";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";

type Props = {
  currentPlayer: Player
  roomId: string
}

const estimationOptions: string[] = [
  '?',
  '☕',
  '0',
  '0.5',
  '1',
  '2',
  '3',
  '5',
  '8',
  '13',
  '20',
  '40',
  '100',
]

const EstimateButtons = ({ currentPlayer, roomId } : Props) => {
  const document = useDocumentContext()
  const [selectedOption, setSelectedOption] = useState<undefined | string>(undefined)
  const [error, setError] = useState(false)

  async function handleUpdateScore(selectedValue: string) {
    setSelectedOption(selectedValue)
    try {
      if (document && document.players) {
        const playersList = [...document.players]
        const playerIndex = playersList.findIndex(player => player.id === currentPlayer.id)
        playersList[playerIndex].points = selectedValue
        
        const ref = doc(db, 'rooms', roomId)
        await updateDoc(ref, {players: playersList})
      }
    } catch (error) {
      // Handle any errors that occur during document creation
      console.error('Error creating document:', error);
      setError(true)
    }
  }

  return ( 
    <div className="max-w-4xl flex flex-wrap gap-6 justify-evenly py-12">
      {estimationOptions.map(option => (
        <button
          key={option}
          className={`h-[100px] w-[80px] transition-all ease-in duration-150 font-medium text-3xl rounded-lg shadow-md ${selectedOption === option ? 'bg-hippo-brand-green text-hippo-brand-grey' : 'bg-white hover:bg-gray-100 text-hippo-brand-navy focus:outline-none focus:ring-2 focus:ring-hippo-brand-green'}`}
          onClick={() => handleUpdateScore(option)}
        >
          {option}
        </button>
      ))}
      {error && (
        <ErrorAlert>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
            onClick={() => setError(false)}
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </ErrorAlert>
        )}
    </div>
  )
}
 
export default EstimateButtons;