import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import TextField from '@material-ui/core/TextField';
import {
    Link
  } from "react-router-dom";

export default (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submit = (type) => {
        props.onSubmit(type, {
            password,
            email
        });
    };

    return (

        <div>
            <Card>
                <CardHeader title="Login"/>
                <CardContent>
                    <div>
                        <TextField
                            label="Email"
                            margin="normal"
                            fullWidth
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div>
                        <TextField
                            fullWidth
                            label="Password"
                            margin="normal"
                            type="password"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Not an user? </span>
                        <Link to="/access/register">Register</Link>
                    </div>
                </CardContent>
                <CardActions>
                    <Fab color="secundary" onClick={() => submit('google')}>G</Fab>
                </CardActions>
                <CardActions>
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={() => submit('password')}>Login</Button>
                </CardActions>
            </Card>
        </div>
    );
}