'use client'

import ErrorAlert from "@/components/ui/error-alert";
import RoomHeader from "@/components/ui/room-header";
import { Player } from "@/hooks/useRealtimeDocumentListener";
import { db } from "@/lib/firebase/config";
import { Backdrop, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddPlayerPage({ params }: { params: { id: string } }) {
  const [displayName, setDisplayName] = useState("")
  const [displayNameError, setDisplayNameError] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(false)
  const router = useRouter()

  async function handleSubmit() {
    if (!displayName) {
      setDisplayNameError(true)
      return
    }

    setPending(true)

    try {
      // UPDATE FIRESTORE DOCUMENT WITH NEW PLAYER
      const newPlayerData: Player = {
        id: (localStorage.getItem("player_id") as string),
        name: displayName,
      }
      const ref = doc(db, 'rooms', params.id)
      await updateDoc(ref, {players: arrayUnion(newPlayerData)})

      // If document creation is successful, navigate to the room
      router.replace(`/room/${params.id}`);

    } catch (error) {
      // Handle any errors that occur during document creation
      console.error('Error creating document:', error);
      setError(true)
      setPending(false)
    }
  }

  return (
    <>
      <RoomHeader />
      <main>
        <Dialog
          open={true}
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
              Enter room
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
      </main>
    </>
  );
}
