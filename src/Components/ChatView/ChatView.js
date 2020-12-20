import React, { useEffect, useState } from 'react';

// material ui core components
import { makeStyles } from '@material-ui/core/styles';

// images
import UserAvatar from '../../assets/images/useravatar.png';
import MineAvatar from '../../assets/images/mineavatar.png';
import { camelCase } from 'jquery';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc(100% - 20px)',
    height: '100%',
    padding: '10px',
  },
  messageArea: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: '10px',
  },
  avatar: {
    width: '50px',
    height: '50px',
    borderRadius: '25px',
    marginRight: '10px',
  },
  flexStart: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: 'calc(100% - 60px)',
  },
  username: {
    fontSize: '16px',
    fontWeight: 900,
    lineHeight: '20px',
    marginRight: '10px',
    marginBottom: '8px',
    color: '#333',
  },
  time: {
    display: 'flex',
    alignItems: 'flex-end',
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    marginBottom: '8px',
    color: '#333',
  },
  message: {
    maxWidth: 'none',
    width: '100%',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '18px',
    color: '#333',
    marginBottom: '4px',
  }
}));

// main function
const ChatView = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.messageArea}>
        <img src={UserAvatar} className={classes.avatar} alt="..." />
        <div className={classes.flexStart}>
          <div className={classes.username}>
            Friend Name
          </div>
          <div className={classes.time}>
            18:03
          </div>
          <div className={classes.message}>
            This is a friend's test message
          </div>
          <div className={classes.message}>
            This is a friend's test message
          </div>
        </div>
      </div>
      <div className={classes.messageArea}>
        <img src={MineAvatar} className={classes.avatar} alt="..." />
        <div className={classes.flexStart}>
          <div className={classes.username}>
            My Name
          </div>
          <div className={classes.time}>
            18:04
          </div>
          <div className={classes.message}>
            This is my test message
          </div>
          <div className={classes.message}>
            This is my test message
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatView;