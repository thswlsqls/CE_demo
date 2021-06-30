import React from 'react'
import { Tab, Tabs } from '@material-ui/core';
import { matchPath, NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {createBrowserHistory} from 'history'
import PaymentIcon from '@material-ui/icons/Payment';
import BusinessIcon from '@material-ui/icons/Business';

const navItems = [
    {
      id: 'company',
      path: '/company',
      text: '업체평가',
      icon: <BusinessIcon />
    },
    {
      id: 'expense',
      path: '/expense',
      text: '경비관리',
      icon : <PaymentIcon />
    }
  ]
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

  export default function Navigation() {
    const classes = useStyles();
    const {pathname} = createBrowserHistory();
    const activeItem = navItems.find((item) => !!matchPath(pathname, { path: item.path }));

    return (
        <div>
            <Paper square className={classes.root}>
            <Tabs
              value={activeItem?.id}
              variant="fullWidth"
              indicatorColor="secondary"
              textColor="secondary"
              aria-label="icon label tabs example"
            >
              {navItems.map((item)=>(
                <Tab key={item.id} 
                          value={item.id}   
                          label={item.text}
                          component={NavLink}
                          to={item.path}
                          icon={item.icon}
                  />
              ))}
            </Tabs>
          </Paper>
        </div>
    )
}

