'use client'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

const CreateRoomDialog = () => {
  const [dialogOpen, setDialogOpen] = useState(false)

  function handleOpenDialog() {
    setDialogOpen(true)
  }

  function handleCloseDialog() {
    setDialogOpen(false)
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
            id="name"
            name="email"
            label="Your display name"
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions sx={{ padding: 6 }}>
          <button
            type="submit"
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-hippo-brand-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            onClick={handleOpenDialog}
          >
            Create room
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}
 
export default CreateRoomDialog;