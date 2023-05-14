import React from "react";
import classes from './ControlPanel.module.css';
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth"

const ControlPanel = ({getSelection}) => {

    const navigate = useNavigate()

    const chat = () => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user && user.emailVerified === true)
                navigate('/chat')
            else
                navigate('/register')
        });
    }

    return (
        <div className={classes.controlPanel}>
            <button className={classes.button} value='today' onClick={e => getSelection(e.target.value)}>Сегодня</button>
            <button className={classes.button} value='tomorrow' onClick={e => getSelection(e.target.value)}>Завтра</button>
            <button className={classes.button} value='three_day' onClick={e => getSelection(e.target.value)}>3 дня</button>
            <button className={classes.button} value='week' onClick={e => getSelection(e.target.value)}>Неделя</button>
            <button className={classes.chat} onClick={() => chat()}>Чат</button>
        </div>
    )
}

export default ControlPanel;