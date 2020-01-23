import React from 'react';
import { Container } from '@material-ui/core';

export default (props) => {
    return (
        <Container>
           {props.children}
        </Container>
    );
}