import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import ErrorAlert from "./error-alert";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/config";
import { useDocumentContext } from "@/app/contexts/documentContext";
import { Player } from "@/hooks/useRealtimeDocumentListener";

const DeleteScoresDialog = ({ callback, roomId } : { callback: () => void, roomId: string }) => {
  const document = useDocumentContext()
  const [error, setError] = useState(false)
  
  async function handleDeleteScores() {
    try {
      const updatedPlayersData: Player[] | undefined = document?.players.map(({ id, name }) => ({ id, name }))
      
      const ref = doc(db, 'rooms', roomId)
      await updateDoc(ref, {
        scoresHidden: true,
        players: updatedPlayersData
      })

    } catch (error) {
      console.error('Error creating document:', error);
      setError(true)
    }

    callback()
  }

  return ( 
    <>
      <Dialog
        open={true}
        onClose={callback}
        disableRestoreFocus
        fullWidth
      >
        <DialogTitle sx={{ fontSize: 26, padding: 6 }}>Delete Estimates</DialogTitle>
        <DialogContent sx={{ paddingX: 6 }}>
          <Typography>This will clear all estimates in this room</Typography>
        </DialogContent>
        <DialogActions sx={{ padding: 6 }}>
          <button
            type="submit"
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-hippo-brand-navy rounded-lg border border-hippo-brand-grey hover:bg-gray-100 focus:ring-4 focus:ring-primary-300"
            onClick={callback}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-red-600 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
            onClick={handleDeleteScores}
          >
            Confirm
          </button>
        </DialogActions>
      </Dialog>
      {error && <ErrorAlert callback={() => setError(false)} /> }
    </>
  )
}
 
export default DeleteScoresDialog;