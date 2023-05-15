import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Loading.module.css';
import React from 'react'

const Loading = () => {
  return (
    <div className={classes.loading}>
        <span><FontAwesomeIcon icon={faSpinner} spinPulse /></span>
    </div>
  )
}

export default Loading