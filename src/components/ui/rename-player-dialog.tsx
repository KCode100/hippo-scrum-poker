import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
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
}

const RenamePlayerDialog = ({ callback, roomId, player }: Props) => {
  const document = useDocumentContext()
  const [displayName, setDisplayName] = useState(player.name)
  const [displayNameError, setDisplayNameError] = useState(false)
  const [error, setError] = useState(false)

  async function handleSubmit() {
    const trimmedName = displayName.trim()
    if (!trimmedName) {
      setDisplayNameError(true)
      return
    }

    try {
      if (document?.players) {
        const playersList = document.players.map((p) =>
          p.id === player.id ? { ...p, name: trimmedName } : p
        )

        const ref = doc(db, "rooms", roomId)
        await updateDoc(ref, { players: playersList })
      }

      callback()
    } catch (error) {
      console.error("Error renaming player:", error)
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
        <DialogTitle sx={{ fontSize: 26, padding: 6 }}>Rename yourself</DialogTitle>
        <DialogContent sx={{ padding: 6 }}>
          <TextField
            autoFocus
            required
            margin="dense"
            label="Your display name"
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={displayName}
            onChange={(e) => {
              setDisplayName(e.target.value)
              setDisplayNameError(false)
            }}
            error={displayNameError}
          />
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
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-hippo-brand-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
            onClick={handleSubmit}
          >
            Save
          </button>
        </DialogActions>
      </Dialog>
      {error && <ErrorAlert callback={() => setError(false)} />}
    </>
  )
}

export default RenamePlayerDialog
