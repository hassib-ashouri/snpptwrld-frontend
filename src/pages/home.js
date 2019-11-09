import React, { useState, useEffect } from "react"
import AppBar from "@material-ui/core/AppBar"
import CssBaseline from "@material-ui/core/CssBaseline"
import Divider from "@material-ui/core/Divider"
import Drawer from "@material-ui/core/Drawer"
import InputBase from "@material-ui/core/InputBase"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import MailIcon from "@material-ui/icons/Mail"
import Switch from "@material-ui/core/Switch"
import SnpptListView from "../components/SnpptListView"
import SearchIcon from "@material-ui/icons/Search"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import { makeStyles, fade } from "@material-ui/core/styles"
import UserPanel from '../components/UserPanel'

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
    zIndex: theme.zIndex.drawer + 1,
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
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(15),
      width: "auto",
    },
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

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
];


function Home(props) {
  // destructuring the passed data
  // defaulting on destructuring kicks in when the value is undefined
  // location.state is null when it is empty.
  if(props.location.state === null) props.location.state = undefined;
  const { 
    container,
    passedSnppts,
  } = props;


  const classes = useStyles();
  const [checked, setChecked] = useState([]);

  // the list of snippets
  const filters = ["Java", "Python", "Java Script", "Bash"];
  
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
  };

  useEffect(() => {
    // use this for debugging
  })


  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <List>
        {filters.map((filterName, index) => (
          <ListItem key={filterName}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={filterName} />
            <Switch
              edge="end"
              onChange={handleFilterToggele(filterName)}
              checked={checked.indexOf(filterName) !== -1}
              inputProps={{ "aria-labelledby": "switch-list-label-wifi" }}
            />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["Post Snppt", "Request Snppt"].map(btnTxt => (
          <ListItem button key={btnTxt}>
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={btnTxt} />
          </ListItem>
        ))}
        <Divider />
        <UserPanel />
      </List>
    </div>
  )

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
          <Typography variant="h6" noWrap>
            SnpptWrld
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}

        <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        {drawer}
      </Drawer>
      </nav>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <SnpptListView items={filteredSnppts} />
      </main>
    </div>
  )
}

export default Home
