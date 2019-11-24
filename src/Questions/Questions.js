import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export default () => {

    const style = {
        button: {
            marginTop: '20px'
        }
    };
    return (
        <div>
             <Grid 
                direction="row"
                container 
             >
                <Grid xs={12} md={3} item >
                    <Card>
                    <CardHeader>
                        <h2>Brief #1</h2>
                    </CardHeader>
                    <CardContent>
                        <h2>Digimovil</h2>
                        <p>Estamos buscando validar nuestro servicio premium con usuarios jovenes de Madrid. Buscamos ...</p>
                    </CardContent>
                    <CardActions>
                        <Button>
                            Ver más
                        </Button>
                    </CardActions>
                </Card>
                </Grid>
            </Grid>
            
            <div>
                <Button style={style.button} color="primary" size="large" variant="contained">New Brief</Button>
            </div>
        </div>
    );
};