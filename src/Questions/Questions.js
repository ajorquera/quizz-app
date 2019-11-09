import React, { useState } from 'react';
import api from '../utils/api';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';


export default () => {
    const [questions, setQuestions] = useState([]);
    const [isDataFetched, setIsDataFetched] = useState(false);

    const handleError = (error) => {
        console.log(error.message)
    }

    if(!isDataFetched) {
        api.questions.get().then((data) => {
            setQuestions(data);
            setIsDataFetched(true);
        }).catch(handleError);
    }

    const changeAnswer = ({answerId, questionId}) => {
        const question = questions.find(q => q.id === questionId);
        
        if(question.answerId !== answerId) {
            question.answerId = answerId;
            setQuestions([...questions]);
        }
    }

    const saveAnswers = () => {
        const answers = questions.filter(q => !!q.answerId).map(q => ({questionId: q.id, answerId: q.answerId}));
        
        api.users.update({
            answeredQuestions: answers
        });
    }

    return (
        <div>
            <List>
                {questions.map(question => (
                    <Paper key={question.id}>
                        <ListItem>
                            <ListItemText primary={question.text} />
                        </ListItem>
                        <List>
                            {question.answers.map(answer => (
                                <ListItem key={answer.id + question.answerId}>
                                    <ListItemIcon>
                                        <Radio
                                            checked={question.answerId === answer.id}
                                            tabIndex={-1}
                                            onChange={(e) => changeAnswer({answerId: e.target.value, questionId: question.id})}
                                            value={answer.id}
                                            disableRipple
                                        />
                                    </ListItemIcon>
                                    <ListItemText primary={answer.text} />
                                </ListItem>
                            ))}
                        </List>
                       
                    </Paper>
                ))}
            </List>
            <div>
                <Button color="primary" size="large" variant="contained" onClick={saveAnswers}>Save</Button>
            </div>
        </div>
    );
};