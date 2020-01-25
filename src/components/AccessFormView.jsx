import React from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import Link from './Link';
import Paper from '@material-ui/core/Paper';
import { Button } from '@material-ui/core';

const styles = {
  container: {
    padding: '20px 30px'
  },
  title: {
    textAlign: 'center'
  },
  links: {
    textAlign: 'center'
  }
}

const AccessFormView = (props) => {
  const history = useHistory();
  const goBack = () => {
    history.goBack();
  }

  return (
    <Paper style={styles.container}>
      {props.back && (
        <Button onClick={goBack}>&lt; Atrás</Button>
      )}
      <h2 style={styles.title}>{props.title}</h2>
      {props.children}
      {props.links.map((link, i) => (
        <div key={i} style={styles.links}>
            <Link to={link.to}>{link.label}</Link>
        </div>
      ))}
    </Paper>
  )
};

AccessFormView.propTypes = {
  links: PropTypes.array
};

AccessFormView.defaultProps = {
  links: []
};

export default AccessFormView;