'use client'
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import QRCode from "react-qr-code";

const ShareRoomDialog = ({ open = false }: { open?: boolean }) => {
  const [dialogOpen, setDialogOpen] = useState(open)
  const [copiedText, copy] = useCopyToClipboard()
  const [copiedAlertOpen, setCopiedAlertOpen] = useState(false)
  const pathname = usePathname()
  const currentURL = `${process.env.NEXT_PUBLIC_URL}${pathname}`

  useEffect(() => {
    setDialogOpen(open)
  }, [open])

  const handleCopyLink = () => {
    copy(currentURL)
      .then(() => {
        setCopiedAlertOpen(true)
        setDialogOpen(false)
      })
      .catch(error => {
        console.error('Failed to copy!', error)
      })
  }

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
      className="inline-flex items-center text-hippo-brand-navy border border-hippo-brand-navy bg-gray-100 hover:bg-white focus:ring-1 focus:outline-none focus:ring-hippo-brand-navy font-medium rounded-lg text-sm px-5 py-3 text-center me-2 mb-2"
      onClick={handleOpenDialog}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
      </svg>
      Invite players
    </button>
      <Dialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        disableRestoreFocus
        fullWidth
      >
        <DialogTitle sx={{ fontSize: 26, padding: 6 }}>Invite players</DialogTitle>
        <DialogContent sx={{ paddingX: 6, paddingY: 0 }}>
          <TextField
            margin="dense"
            label="Game's url"
            type="text"
            fullWidth
            variant="outlined"
            autoComplete="off"
            value={currentURL}
          />
          <QRCode
            style={{ height: "auto", maxWidth: "160px", width: "100%", margin: "auto", paddingTop: "24px" }}
            value={currentURL}
            // size={100}
            // // viewBox={`0 0 256 256`}
          />
        </DialogContent>
        <DialogActions sx={{ padding: 6 }}>
          <button
            type="submit"
            className="w-full px-5 py-3 mr-3 text-base font-medium text-center text-white rounded-lg bg-hippo-brand-green hover:bg-primary-800 focus:ring-4 focus:ring-primary-300"
            onClick={handleCopyLink}
          >
            Copy invitation link
          </button>
        </DialogActions>
      </Dialog>
      {copiedAlertOpen && copiedText && (
        <div className="absolute top-4 m-auto left-0 right-0 flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow" role="alert">
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span className="sr-only">Check icon</span>
          </div>
          <div className="ms-3 text-sm font-normal">Invitation link copied to clipboard!</div>
          <button
            type="button"
            className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8"
            data-dismiss-target="#toast-success"
            aria-label="Close"
            onClick={() => setCopiedAlertOpen(false)}
          >
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      )}
    </>
  );
}
 
export default ShareRoomDialog;