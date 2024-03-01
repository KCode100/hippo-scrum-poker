'use client'
import { useRouter } from 'next/navigation'
import { db } from "@/lib/firebase/config";
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";

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
      const docRef = await addDoc(collection(db, 'rooms'), {
        timestamp: serverTimestamp(),
        user: [
          {
            name: displayName,
            id: userId,
            roomCreator: true
          }
        ]
      });
      localStorage.setItem("user_id", userId)
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
        className="inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-hippo-brand-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
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
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-hippo-brand-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
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
      {error && (
        <div className="absolute top-4 m-auto left-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
            </svg>
            <span className="sr-only">Error icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">An error occurred.</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
            onClick={() => setError(false)}
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
 
export default CreateRoomDialog;