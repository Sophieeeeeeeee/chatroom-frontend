import React, {useState} from 'react';
import { IconButton } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import VideocamOffIcon from '@mui/icons-material/VideocamOff';

const CameraButton = ({localStream}) => {

    const [cameraEnabled, setCameraEnabled] = useState(true);
    const handleToggleCamera = () => {
        localStream.getVideoTracks()[0].enabled = !cameraEnabled; // track 0 is for from camera
        setCameraEnabled(!cameraEnabled);
    }

    return (
        <IconButton onClick={handleToggleCamera} style={{color: 'white'}}>
            {cameraEnabled ? <VideocamIcon /> : <VideocamOffIcon/>}
        </IconButton>
    );
};

export default CameraButton;