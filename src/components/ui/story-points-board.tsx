import styles from "./points-card.module.css";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ErrorAlert from "./error-alert";
import { useDocumentContext } from "@/app/contexts/documentContext";
import DeleteScoresDialog from "./delete-scores-dialog";

const StoryPointsBoard = ({ roomId }: { roomId: string }) => {
  const document = useDocumentContext()
  const [scoresHidden, setScoresHidden] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [error, setError] = useState(false)

  async function handleToggleScores() {
    setScoresHidden(!scoresHidden)
    try {
      const ref = doc(db, 'rooms', roomId)
      await updateDoc(ref, { scoresHidden: !scoresHidden })

    } catch (error) {
      console.error('Error creating document:', error);
      setError(true)
    }
  }

  useEffect(() => {
    if (document) {
      setScoresHidden(document?.scoresHidden)
    }
  }, [document])

  return ( 
    <div className="max-w-screen-xl mx-auto">
      <div className="max-w-4xl">
        <div className="flex flex-row">
          <button
            type="button"
            className={`block ml-auto font-medium rounded-lg text-sm px-5 py-2.5 mb-4 min-w-20 focus:outline-none focus:ring-2 border ${scoresHidden ? 'text-hippo-brand-navy bg-gray-100 border-hippo-brand-navy' : 'text-white bg-hippo-brand-purple hover:bg-hippo-brand-purple focus:ring-purple-300 border-hippo-brand-purple'}`}
            onClick={() => setDeleteDialogOpen(true)}
          >
            Delete Estimates
          </button>
          <button
            type="button"
            className={`block ml-auto font-medium rounded-lg text-sm px-5 py-2.5 mb-4 min-w-20 focus:outline-none focus:ring-2 border ${scoresHidden ? 'text-white bg-hippo-brand-purple hover:bg-hippo-brand-purple focus:ring-purple-300 border-hippo-brand-purple' : 'text-hippo-brand-navy bg-gray-100 border-hippo-brand-navy'}`}
            onClick={handleToggleScores}
          >
            {scoresHidden ? 'Show' : 'Hide'}
          </button>
        </div>
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
                    <div className={`${styles.card} ${!player.points ? '' : !scoresHidden && player.points ? styles.isFlipped : ''}`}>
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
      {error && <ErrorAlert callback={() => setError(false)} /> }
      {deleteDialogOpen && <DeleteScoresDialog callback={() => setDeleteDialogOpen(false)} roomId={ roomId } /> }
    </div>
  )
}

export default StoryPointsBoard;