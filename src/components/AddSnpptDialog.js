import React, { useStat } from "react"
import {
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from "@material-ui/core"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import Snppt from "./Snnpt/Snppt"

export default function SnpptViewDialog(props) {
  const { open, snpptid, onClose } = props
  const handleClose = () => {
    onClose()
  }

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={open}
    >
      <DialogTitle id="customized-dialog-title">Modal title</DialogTitle>
      <DialogContent dividers>
        <Typography gutterBottom>
          This dialog should display snppt with id ({snpptid});
        </Typography>
        <Snppt/>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
