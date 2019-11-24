import React, {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {
    Link
  } from "react-router-dom";

export default (props) => {
    const [email, setEmail] = useState('');

    const submit = () => {
        props.onSubmit({
            email
        });
    };

    return (

        <div>
            <Card>
                <CardHeader title="Forgot Password"/>
                <CardContent>
                        <TextField
                            label="Email"
                            margin="normal"
                            fullWidth
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    <div>
                        <span>Go Back </span>
                        <Link to="/access/login">Login</Link>
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={submit}>Reset Password</Button>
                </CardActions>
            </Card>
        </div>
    );
}