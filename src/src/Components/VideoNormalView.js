import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import VideoSmallView from './RemoteSmallView/VideoSmallView';
import AudioSmallView from './RemoteSmallView/AudioSmallView';
import Avatar from '@material-ui/core/Avatar';
import * as $ from 'jquery';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%',
        display: 'flex'
    },
    main_video: {
        height: '100%',
        width: '100%',
        // transform: 'scaleX(-1)',
        objectFit: 'cover'
    },
    div_video_list: {
        height: '-webkit-fill-available',
        margin: '20px',
        position: 'absolute',
        textAlign: 'center',
        right: 0,
    },
    div_remote_videos: {
        width: '100%',
        height: 'calc(100% - 180px)',
        marginTop: '30px',
        overflowY: 'scroll',
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        
    },
    div_avatar: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        visibility: 'hidden'
    },
    avatar: {
        width: '300px',
        height: '300px',
        fontSize: '250px',
    }
}));

const VideoNormalView = (props) => {
    const {localVideoTrack, isLocalHand, remoteUsers, name} = props;
    const classes = useStyles();

    const addSmallVideo = (data) => {
        return(
            <VideoSmallView key={data.videotrack.getParticipantId() + data.videotrack.getType()} track={data.videotrack} video_tag_id={data.videotrack.getParticipantId() + data.videotrack.getType()} user_name={data.user !== null? data.user.getDisplayName() : ''} ishand={data.isHand} />
        );
    }

    const addSmallAudio = (data) => {
        return(
            <AudioSmallView key={data.audiotrack.getParticipantId() + data.audiotrack.getType()} track={data.audiotrack} audio_tag_id={data.audiotrack.getParticipantId() + data.audiotrack.getType()}/>
        )
    }
    
    return(
        <div className={classes.root}>
            <div className={classes.div_avatar}>
                <Avatar className={classes.avatar}>{name.charAt(0).toUpperCase()}</Avatar>
            </div>
            <video className={classes.main_video} autoPlay='1' id='mainVideo' playsInline onSuspend={()=>props.handleRemoveMainVideo()}/>
            <audio autoPlay='1' muted='1' id='mainAudio' />
            <div className={classes.div_video_list} >
                <div id='divLocalSmallVideo'>
                    {localVideoTrack.length === 0 ? null : <VideoSmallView track={localVideoTrack} video_tag_id='localSmallVideo' user_name={name} ishand={isLocalHand} />}
                </div>
                <audio autoPlay='1' muted='1' id='localSmallAudio' />
                <div className={classes.div_remote_videos} id='remoteVideos'>
                    {remoteUsers.map((remoteUser, index) => (
                        remoteUser.videotrack.length === 0 ? null : addSmallVideo(remoteUser)
                    ))}
                    {remoteUsers.map((remoteUser, index) => (
                        remoteUser.audiotrack.length === 0 ? null : addSmallAudio(remoteUser)
                    ))}
                </div>
             </div>
        </div>
    )
}

export default VideoNormalView;