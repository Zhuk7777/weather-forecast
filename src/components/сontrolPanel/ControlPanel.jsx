import React from "react";
import classes from './ControlPanel.module.css';
import { Link } from "react-router-dom";

const ControlPanel = ({getSelection}) => {
    return (
        <div className={classes.controlPanel}>
            <button className={classes.button} value='today' onClick={e => getSelection(e.target.value)}>Сегодня</button>
            <button className={classes.button} value='tomorrow' onClick={e => getSelection(e.target.value)}>Завтра</button>
            <button className={classes.button} value='three_day' onClick={e => getSelection(e.target.value)}>3 дня</button>
            <button className={classes.button} value='week' onClick={e => getSelection(e.target.value)}>Неделя</button>
            <Link className={classes.chat} to='/register'><span>Чат</span></Link>
        </div>
    )
}

export default ControlPanel;