import React from "react"
//import { spacing } from '@material-ui/system';
import Container from "@material-ui/core/Container"
import Card from "@material-ui/core/Card"
import CardActions from "@material-ui/core/CardActions"
import CardContent from "@material-ui/core/CardContent"
import Button from "@material-ui/core/Button"
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { CardHeader } from "@material-ui/core"
import { makeStyles, useTheme } from "@material-ui/core/styles"

const useStyles = makeStyles(theme => ({
  // sttyling for this component is here
}))

export default function SnpptListView(props) {
  const { items } = props
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
  const snppts = items == undefined || items.length == 0 ? fakeSnppts : items
  return (
    <Grid container spacing={3}>
      {snppts.map(snppt => (
        <Grid item xs={12}>
          <Card className={classes.card}>
            <CardHeader title={snppt.title} subheader="by this dude" />
            <CardActions>
              <Button size="small" color="primary">
                Display
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  )
}
