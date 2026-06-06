import styles from "./points-card.module.css";
import { useEffect, useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import ErrorAlert from "./error-alert";
import { useDocumentContext } from "@/app/contexts/documentContext";
import DeleteScoresDialog from "./delete-scores-dialog";
import RenamePlayerDialog from "./rename-player-dialog";
import RemovePlayerDialog from "./remove-player-dialog";
import { Player } from "@/hooks/useRealtimeDocumentListener";
import { useRouter } from "next/navigation";

type Props = {
  roomId: string
  currentPlayer: Player
}

const StoryPointsBoard = ({ roomId, currentPlayer }: Props) => {
  const document = useDocumentContext()
  const router = useRouter()
  const [scoresHidden, setScoresHidden] = useState(true)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [renameTarget, setRenameTarget] = useState<Player | null>(null)
  const [removeTarget, setRemoveTarget] = useState<Player | null>(null)
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

  function handleRemovedSelf() {
    router.replace(`/room/${roomId}/add-player`)
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
              <th scope="col" className="px-6 py-3">Actions</th>
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
                <td className="px-6 py-4 text-hippo-brand-navy normal-case">
                  <div className="flex gap-2">
                    {player.id === currentPlayer.id && (
                      <button
                        type="button"
                        className="font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 border text-hippo-brand-navy bg-gray-100 border-hippo-brand-navy hover:bg-gray-200"
                        onClick={() => setRenameTarget(player)}
                      >
                        Rename
                      </button>
                    )}
                    <button
                      type="button"
                      className="font-medium rounded-lg text-sm px-3 py-1.5 focus:outline-none focus:ring-2 border text-white bg-red-600 border-red-600 hover:bg-red-700"
                      onClick={() => setRemoveTarget(player)}
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {error && <ErrorAlert callback={() => setError(false)} /> }
      {deleteDialogOpen && <DeleteScoresDialog callback={() => setDeleteDialogOpen(false)} roomId={ roomId } /> }
      {renameTarget && (
        <RenamePlayerDialog
          callback={() => setRenameTarget(null)}
          roomId={roomId}
          player={renameTarget}
        />
      )}
      {removeTarget && (
        <RemovePlayerDialog
          callback={() => setRemoveTarget(null)}
          roomId={roomId}
          player={removeTarget}
          currentPlayerId={currentPlayer.id}
          onRemovedSelf={handleRemovedSelf}
        />
      )}
    </div>
  )
}

export default StoryPointsBoard;
