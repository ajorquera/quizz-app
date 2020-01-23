import React from 'react';
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  Access: {
      minHeight: '100vh',
      padding: '15px'
      
  },
  backgroundTop: {
      position: 'absolute',
      height: '40%',
      width: '100%',
      zIndex: '-1',
      background: 'linear-gradient(225deg, rgba(255,38,106,1) 0%, rgba(255,102,64,1) 100%);',
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
  },

  logo: {
      margin: '30px auto',
      display: 'block'
  }
});

export default (props) => {
  const classes = useStyles();
    return (
      <React.Fragment>
        <div className={classes.backgroundTop}></div>
        
            <Grid 
                className={classes.Access}
                container 
                direction="row"
                justify="center"
            >
                <Grid xs={12} sm={8} md={4} item >
                    <img className={classes.logo} src="/logo.png" alt="logo" />
                    {props.children}
                </Grid>
            </Grid>
        </React.Fragment>
    );
};