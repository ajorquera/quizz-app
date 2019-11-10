import React, { useState } from 'react';
import api from '../utils/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';

import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import {
    Link
} from "react-router-dom";


export default () => {
    const [questions, setQuestions] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const handleError = (error) => {
        console.log(error.message)
    }

    if(!isDataFetched) {
        api.questions.get().then((questions) => {
            setQuestions(questions)
            setIsDataFetched(true);
        }).catch(handleError);
    };

    const generateUID = () => parseInt(Math.random()*100000000).toString();

    const newQuestion = () => {
        questions.push({
            id: generateUID(),
            text: '',
            answers: []
        });

        saveQuestions();
    };

    const setQuestionText = (question, text) => {
        question.text = text;

        saveQuestions();
    };

    const setAnswerText = (answer, text) => {
        answer.text = text;

        saveQuestions();
    };

    const newAnswer = (question) => {
        question.answers.push({
            id: generateUID(),
            text: ''
        });

        saveQuestions();
    };

    const saveQuestions = () => {
        setQuestions([...questions])
    };

    return (
        <div>
            <Button>
                <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
            <List>
                {questions.map(question => (
                    <Paper key={question.id}>
                        <ListItem>
                            <TextField
                                label="Question"
                                margin="normal"
                                value={question.text} 
                                onChange={(e) => (setQuestionText(question, e.target.value))}
                            />
                        </ListItem>
                        <List style={{paddingLeft: "25px"}}>
                            {question.answers.map(answer => (
                                <ListItem key={answer.id}>
                                    <TextField
                                        label="Answer"
                                        margin="normal"
                                        value={answer.text} 
                                        onChange={(e) => (setAnswerText(answer, e.target.value))}
                                    />
                                </ListItem>
                            ))}
                            <ListItem>
                                <Fab size="small" onClick={() => newAnswer(question)} color="secondary">+</Fab>
                            </ListItem>
                        </List>
                    </Paper>
                ))}
            </List>
            <div>
                <Button color="primary" size="large" variant="contained" onClick={() => newQuestion()}>New Question</Button>
            </div>
        </div>
    );
};