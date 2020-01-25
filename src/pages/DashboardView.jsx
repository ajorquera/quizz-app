import React from 'react';
import { Container, Grid } from '@material-ui/core';
import AppBar from '../components/AppBar';

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