import React from 'react';
import { Container, Grid } from '@material-ui/core';
import AppBar from '../components/AppBar';

export default (props) => {
    return (
        <React.Fragment>
            <AppBar />
            <Grid container  justify="center">
                <Grid item xs={12} md={6}>
                    <Container>
                        {props.children}
                    </Container>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}