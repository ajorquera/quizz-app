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
    setAnchorEl(event.currentTarget);
  };

  const onClick = () => {
    if(props.accepted && typeof props.onClick === 'function') {
      props.onClick();
    }
  };
  const containerStyle = {...styles.container};

  if(props.accepted) {
    containerStyle.cursor = 'pointer';
  }

  return (
    <Card onClick={onClick} style={{...containerStyle, ...props.style}}>
      <CardContent>
        <IconButton size="small" onClick={handleClick} style={{position: 'absolute', right: 10}}>
          <MoreVert />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={props.onClickMenu.bind(null, 'sendSms', props.id)}>Enviar invitación</MenuItem>
          {props.accepted && <MenuItem onClick={props.onClickMenu.bind(null, 'showInfo', props.id)}>Mostrar información</MenuItem>}
          <MenuItem onClick={props.onClickMenu.bind(null, 'delete', props.id)}>Borrar</MenuItem>
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