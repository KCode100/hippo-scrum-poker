import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import ErrorAlert from "./error-alert";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useDocumentContext } from "@/app/contexts/documentContext";
import { Player } from "@/hooks/useRealtimeDocumentListener";

type Props = {
  callback: () => void
  roomId: string
  player: Player
  currentPlayerId: string
  onRemovedSelf: () => void
}

const RemovePlayerDialog = ({ callback, roomId, player, currentPlayerId, onRemovedSelf }: Props) => {
  const document = useDocumentContext()
  const [error, setError] = useState(false)

  async function handleRemovePlayer() {
    try {
      if (document?.players) {
        const playersList = document.players.filter((p) => p.id !== player.id)

        const ref = doc(db, "rooms", roomId)
        await updateDoc(ref, { players: playersList })
      }

      if (player.id === currentPlayerId) {
        onRemovedSelf()
      } else {
        callback()
      }
    } catch (error) {
      console.error("Error removing player:", error)
      setError(true)
    }
  }

  return (
    <>
      <Dialog
        open={true}
        onClose={callback}
        disableRestoreFocus
        fullWidth
      >
        <DialogTitle sx={{ fontSize: 26, padding: 6 }}>Remove player</DialogTitle>
        <DialogContent sx={{ paddingX: 6 }}>
          <Typography>
            Remove <strong>{player.name}</strong> from this room? They can rejoin with the invite link.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ padding: 6 }}>
          <button
            type="button"
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-hippo-brand-navy rounded-lg border border-hippo-brand-grey hover:bg-gray-100 focus:ring-4 focus:ring-primary-300"
            onClick={callback}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
            onClick={handleRemovePlayer}
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
      {error && <ErrorAlert callback={() => setError(false)} />}
    </>
  )
}

export default RemovePlayerDialog
