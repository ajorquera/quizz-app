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
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const submit = () => {
        props.onSubmit({
            password,
            email
        });
    };

    return (

        <div>
            <Card>
                <CardHeader title="Register"/>
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
                        <TextField
                            fullWidth
                            label="Confirm Password"
                            margin="normal"
                            type="password"
                            value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <span>Already an user? </span>
                        <Link to="/access/login">Login</Link>
                    </div>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color="primary" size="large" fullWidth onClick={submit}>Register</Button>
                </CardActions>
            </Card>
        </div>
    );
}