import React, { useState, useEffect } from "react"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import Hidden from "@material-ui/core/Hidden"
import IconButton from "@material-ui/core/IconButton"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction"
import MailIcon from "@material-ui/icons/Mail"
import MenuIcon from "@material-ui/icons/Menu"
import Switch from "@material-ui/core/Switch"
import SnpptListView from "../components/SnpptListView"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, useTheme } from "@material-ui/core/styles"

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}))

function App(props) {
  const { container, passedSnppts } = props
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const [checked, setChecked] = useState([])
  // the list of snippets
  const filters = ["Java", "Python", "Java Script", "Bash"]
  const fakeSnppts = [
    {
      id: "1",
      title: "Ext. A sample javas snppt",
      resource: "/lskdjf",
      lang: "Java",
    },
    {
      id: "2",
      title: "Ext. A sample Python snppt",
      resource: "/lskdj",
      lang: "Python",
    },
    {
      id: "3",
      title: "Ext. A sample Bash snppt",
      resource: "/lskdjf",
      lang: "Bash",
    },
    {
      id: "4",
      title: "Ext. A sample Java script snppt",
      resource: "/lskdjf",
      lang: "Java Script",
    },
  ]
  const [snppts, setSnppts] = useState(
    passedSnppts === undefined ? fakeSnppts : passedSnppts
  )
  // hold filtered snppts according to the selected toggles
  const [filteredSnppts, setFilteredSnppts] = useState(snppts)
  const handleFilterToggele = value => () => {
    // check if the filter is in the checked list
    const currentIndex = checked.indexOf(value)
    // the state for the new checked filters
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }
    setChecked(newChecked)

    // handle the filttering
    // if no filter is seleted, assign to non filtered list
    if (newChecked.length === 0) {
      setFilteredSnppts(snppts)
    } else {
      const newSnpptsOrder = snppts.filter(snppt =>
        newChecked.includes(snppt.lang)
      )
      setFilteredSnppts(newSnpptsOrder)
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  useEffect(() => {
    // use this for debugging
    console.log(filteredSnppts)
  })

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {filters.map((filterName, index) => (
          <ListItem button key={filterName}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={filterName} />
            <ListItemSecondaryAction>
              <Switch
                edge="end"
                onChange={handleFilterToggele(filterName)}
                checked={checked.indexOf(filterName) !== -1}
                inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
              />
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SnpptListView items={filteredSnppts} />
      </main>
    </div>
  )
}

export default App
