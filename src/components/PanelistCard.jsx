import React from 'react';
import { Card, CardContent, Chip, IconButton, Menu, MenuItem } from '@material-ui/core';
import { MoreVert, AccountCircle } from '@material-ui/icons';


const styles = {
  container: {
    position: 'relative'
  }
};

export default (props) => {
  const {name} = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = event => {
    event.preventDefault();
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

 
  const containerStyle = {...styles.container};

  const onClickMenu = (event, type) => {
    event.preventDefault();
    event.stopPropagation();

    if(typeof props.onClickMenu === 'function') props.onClickMenu(type, props.id);
  };

  return (
    <Card style={{...containerStyle, ...props.style}}>
      <CardContent>
        <IconButton size="small" onClick={handleClick} style={{position: 'absolute', right: 10}}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={(e) => onClickMenu(e, 'sendSms')}>Enviar invitación</MenuItem>
          {props.accepted && <MenuItem onClick={(e) => onClickMenu(e, 'showInfo')}>Ver Informacion</MenuItem>}
          <MenuItem onClick={(e) => onClickMenu(e, 'delete')}>Borrar</MenuItem>
        </Menu>
        <div style={{textAlign: 'center'}}>
          <AccountCircle style={{fontSize: '50px'}} />
        </div>
        <h2>{name}</h2>
        <Chip
          size="small"
          label={props.accepted ? 'Invitacion aceptada':'Pendiente'}
          color={props.accepted ? 'primary':'secondary'}
        />
      </CardContent>
    </Card>
  )
};