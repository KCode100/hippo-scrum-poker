import styles from "./points-card.module.css";
import { useEffect, useState } from "react";
import { useDocumentContext } from "@/app/room/[id]/page";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ErrorAlert from "./error-alert";

const StoryPointsBoard = ({ roomId }: { roomId: string }) => {
  const document = useDocumentContext()
  const [showPoints, setShowPoints] = useState(false)
  const [error, setError] = useState(false)

  async function handleShowPoints() {
    setShowPoints(!showPoints)
    try {
      const ref = doc(db, 'rooms', roomId)
      await updateDoc(ref, { scoresHidden: !showPoints })

    } catch (error) {
      console.error('Error creating document:', error);
      setError(true)
    }
  }

  useEffect(() => {
    if (document) {
      setShowPoints(document?.scoresHidden)
    }
  }, [document])

  return ( 
    <div className="max-w-screen-xl mx-auto">
      <div className="max-w-4xl">
        <button
          type="button"
          className={`block ml-auto font-medium rounded-lg text-sm px-5 py-2.5 mb-4 min-w-20 focus:outline-none focus:ring-2 border ${showPoints ? 'text-hippo-brand-navy bg-gray-100 border-hippo-brand-navy' : 'text-white bg-hippo-brand-purple hover:bg-hippo-brand-purple focus:ring-purple-300 border-hippo-brand-purple'}`}
          onClick={handleShowPoints}
        >
          {showPoints ? 'Hide' : 'Show'}
        </button>
        <table className="w-full text-left rtl:text-right text-gray-500">
          <thead className="text-sm text-hippo-brand-grey uppercase bg-hippo-brand-navy">
            <tr>
              <th scope="col" className="px-6 py-3">Name</th>
              <th scope="col" className="px-6 py-3">Story Points</th>
            </tr>
          </thead>
          <tbody>
            {document?.players.map(player => (
              <tr key={player.id} className="bg-gray-50 border-b capitalize">
                <th scope="row" className="px-6 py-4 text-base font-semibold text-hippo-brand-navy whitespace-nowrap">
                  { player.name }
                </th>
                <td className="px-6 py-4 text-hippo-brand-navy">
                  <div className={styles.wrapper}>
                    <div className={`${styles.card} ${showPoints && player.points ? styles.isFlipped : ''}`}>
                      <div className={`${styles.card__face} ${styles.card__facefront}`}>
                        {player.points ? (
                          <img src="/hippo.png" alt="hippo" width="50%" />
                        ) : (
                          <span>-</span>
                        )}
                      </div>
                      <div className={`${styles.card__face} ${styles.card__faceback}`}>{player.points}</div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

export default StoryPointsBoard;