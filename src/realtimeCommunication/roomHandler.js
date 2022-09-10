import store from "../store/store";
import { 
    setOpenRoom, 
    setRoomDetails,
    setActiveRooms,
    setLocalStream,
    setRemoteStreams,
    setScreenSharingStream,
    setIsUserJoinedWithOnlyAudio,
} from "../store/actions/roomActions";
import * as socketConnection from './socketConnection';
import * as webRTCHandler from './webRTCHandler';

export const createNewRoom = () => {
    // only done if access to local stream, so pass as callback func
    const successCallbackFunction = () => {
        store.dispatch(setOpenRoom(true, true));

        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));

        socketConnection.createNewRoom();
    }
    const audioOnly = store.getState().room.audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunction); //true if no camera
}

export const newRoomCreated = (data) => {
    const {roomDetails} = data;
    store.dispatch(setRoomDetails(roomDetails));
}

export const updateActiveRooms = (data) => {
    const {activeRooms} = data;

    const friends = store.getState().friends.friends;
    const rooms = [];

    const userId = store.getState().auth.userDetails?._id;

    activeRooms.forEach((room) => {
        const isRoomCreatedByMe = room.roomCreator.userId == userId;

        if (isRoomCreatedByMe){
            rooms.push({...room, creatorUsername: 'Me'}); // we get to see the room we created
        } else {

            friends.forEach((f) => {
                if (f.id === room.roomCreator.userId) { // only save rooms created by friend
                    rooms.push({...room, creatorUsername: f.username});
                }
            });
        }
    });

    store.dispatch(setActiveRooms(rooms));

}

export const joinRoom = (roomId) => {
    const successCallbackFunction = () => {
        store.dispatch(setRoomDetails({roomId}));
        store.dispatch(setOpenRoom(false, true)); // isCreator false, isInroom true
        
        const audioOnly = store.getState().room.audioOnly;
        store.dispatch(setIsUserJoinedWithOnlyAudio(audioOnly));
        
        socketConnection.joinRoom({roomId});
    }

    const audioOnly = store.getState().audioOnly;
    webRTCHandler.getLocalStreamPreview(audioOnly, successCallbackFunction); //true if no camera
}

export const leaveRoom = () => {
    const roomId = store.getState().room.roomDetails.roomId;

    const localStream = store.getState().room.localStream;
    if (localStream){
        localStream.getTracks().forEach(track => {
            track.stop();
        })
        store.dispatch(setLocalStream([]));
    }

    const screenSharingStream = store.getState().room.screenSharingStream;
    if (screenSharingStream){
        screenSharingStream.getTracks().forEach(track => {
            track.stop();
        });
        store.dispatch(setScreenSharingStream(null));
    }

    store.dispatch(setRemoteStreams([]));
    webRTCHandler.closeAllConnections();
    
    socketConnection.leaveRoom({roomId});
    store.dispatch(setRoomDetails(null));
    store.dispatch(setOpenRoom(false, false)); // creator false, isinroom false
}