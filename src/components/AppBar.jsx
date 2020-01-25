import React, {useRef} from 'react';
import { AppBar, Toolbar, IconButton, Badge, Menu, MenuItem } from '@material-ui/core';
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {useHistory} from 'react-router-dom';

const styles = {
  container: {

  },
  title: {
      marginLeft: '10px',
      flexGrow: 1,
  },
  logo: {
      width: '70px'
  }
};

export default (props) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const anchorEl = useRef(null);
  const history = useHistory();

  return (
    <AppBar style={styles.container}>
      <Toolbar>
        <img style={styles.logo} alt="Remy Sharp" src="/logo.png" />
        <h2 style={styles.title}>IPANEL.club</h2>
        <div className={styles.sectionDesktop}>
          <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="primary">
              <NotificationsIcon />
          </Badge>
          </IconButton>
          <IconButton
            ref={anchorEl}
            edge="end"
            onClick={() => setIsMenuOpen(true)}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl.current}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            <MenuItem onClick={() => history.push('/login')}>Logout</MenuItem>
          </Menu>
        </div>
                </Toolbar>
    </AppBar>
  )
};