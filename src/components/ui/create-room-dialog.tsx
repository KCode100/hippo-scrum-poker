'use client'
import { useRouter } from 'next/navigation'
import { db } from "@/lib/firebase/config";
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import { RoomData } from '@/hooks/useRealtimeDocumentListener';
import ErrorAlert from './error-alert';

const CreateRoomDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [displayName, setDisplayName] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const [displayNameError, setDisplayNameError] = useState(false)
  const router = useRouter()

  function handleOpenDialog() {
    setDialogOpen(true)
  }

  function handleCloseDialog() {
    setDialogOpen(false)
  }

  async function handleSubmit() {
    if (!displayName) {
      setDisplayNameError(true)
      return
    }

    setPending(true)
    setDialogOpen(false)

    try {
      // CREATE A NEW FIRESTORE DOCUMENT
      const userId = crypto.randomUUID()
      const newDocData: RoomData = {
        timestamp: serverTimestamp(),
        scoresHidden: true,
        players: [
          {
            name: displayName,
            id: userId,
            roomCreator: true
          }
        ]
      }

      const docRef = await addDoc(collection(db, 'rooms'), newDocData)
      localStorage.setItem("player_id", userId)

      // If document creation is successful, navigate to the created room
      router.push(`/room/${docRef.id}`);

    } catch (error) {
      // Handle any errors that occur during document creation
      console.error('Error creating document:', error);
      setError(true)
      setPending(false)
    }
  }

  return ( 
    <>
      <button
        type="button"
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-hippo-brand-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
        onClick={handleOpenDialog}
      >
        Create instant room
        <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
      </button>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        disableRestoreFocus
        fullWidth
      >
        <DialogTitle sx={{ fontSize: 26, padding: 6 }}>Choose your display name</DialogTitle>
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
            onChange={(e) => setDisplayName(e.target.value)}
            error={displayNameError}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 6 }}>
          <button
            type="submit"
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-hippo-brand-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
            onClick={handleSubmit}
            disabled={pending}
          >
            Create room
          </button>
        </DialogActions>
      </Dialog>
      {pending && (
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={pending}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      {error && <ErrorAlert callback={() => setError(false)} /> }
    </>
  );
}
 
export default CreateRoomDialog;