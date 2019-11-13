import React, { useState } from "react"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import { CardHeader } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import SnpptViewDialog from "../components/SnpptViewDialog"

const useStyles = makeStyles(theme => ({
  // sttyling for this component is here
}))

export default function SnpptListView(props) {
  const { items, snpptViewHandler } = props
  const [open, setOpen] = useState(false)
  const [snpptViewerData, setSnpptViewerData] = useState({ id: "default ip" })
  const displaySnpptHandler = snpptId => () => {
    setSnpptViewerData({ id: snpptId })
    setOpen(true)
  }
  const handleClose = () => setOpen(false)
  const classes = useStyles()
  const fakeSnppts = [
    {
      id: "1",
      title: "A sample javas snppt",
      resource: "/lskdjf",
      lang: "Java",
    },
    {
      id: "2",
      title: "A sample Python snppt",
      resource: "/lskdj",
      lang: "Python",
    },
    {
      id: "3",
      title: "A sample Bash snppt",
      resource: "/lskdjf",
      lang: "Bash",
    },
    {
      id: "4",
      title: "A sample Java script snppt",
      resource: "/lskdjf",
      lang: "Java Script",
    },
  ]
  // view mock data unless data is provided by the parent
  const snppts = items == undefined || items.length == 0 ? fakeSnppts : items
  return (
    <>
      <SnpptViewDialog
        onClose={handleClose}
        snpptid={snpptViewerData.id}
        open={open}
      />
      <Grid container spacing={3}>
        {snppts.map(snppt => (
          <Grid item xs={12} key={snppt.id}>
            <Card className={classes.card}>
              <CardHeader title={snppt.title} subheader="by this dude" />
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={displaySnpptHandler(snppt.id)}
                >
                  Display
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
