import './App.css';

import React from 'react';

import {
  BrowserRouter as Router, 
  Switch, 
  Route
} from 'react-router-dom';
import CompanyPage from './components/views/CompanyPage/CompanyPage';
import ExpensePage from './components/views/ExpensePage/ExpensePage';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import Navigation from "./components/views/Header/Navigation"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },

  navRoot:{
    flexGrow: 1,
    maxWidth: 500,
  }
}));

function App() {

  const classes = useStyles();

  return (
    <div className="App">
        <header>
          <div className={classes.root}>
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography style={{textAlign: 'left'}} variant="h6" className={classes.title}>
                  {/* ALim */}
                  Home
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
          </div>
        </header>
        
      <Router>
        <Navigation/>
          <Switch>
              <Route exact path="/" component={CompanyPage} />
              <Route exact path="/company" component={CompanyPage} />
              <Route exact path="/expense" component={ExpensePage}/>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
