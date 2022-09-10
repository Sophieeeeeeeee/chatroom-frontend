import React, {useEffect, useRef} from 'react';
import {styled} from '@mui/system';

const MainContainer = styled('div')({
    height: '50%',
    width: '50%',
    backgroundColor: 'black',
    borderRadius: '8px'
})

const VideoEl = styled('video')({  // html video element
    width: '100%',
    height: '100%'
})

const Video = ({stream, isLocalStream}) => { // muted if local stream, dont wanna hear ourselves
    const videoRef = useRef(null);

    useEffect(() => {
        const video = videoRef.current;
        video.srcObject = stream;  // **! where the video comes from!!

        video.onloadedmetadata = () => { // listener to start video correctlu for some browsers
            video.play();
        }
    }, [stream]);

    return (
        <MainContainer>
            <VideoEl ref={videoRef} 
                autoPlay 
                muted={isLocalStream ? true : false} />
        </MainContainer>
    );
};

export default Video;