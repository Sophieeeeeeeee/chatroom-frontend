import io from 'socket.io-client';
import {setPendingFriendsInvitations, setFriends, setOnlineUsers} from '../store/actions/friendsActions';
import store from '../store/store';
import {updateDirectChatHistoryIfActive} from '../authPages/shared/utils/chat';
import * as roomHandler from './roomHandler';
import * as webRTCHandler from './webRTCHandler';

let socket = null;

export const connectWithSocketServer = (userDetails) => {
    const jwtToken = userDetails.token;

    socket = io('http://localhost:5002',
    {
        auth: {
            token: jwtToken,
        }
    }); // connect to server

    socket.on('connect', () => { // event listens for connect event
        console.log('successfully connected with socket.io.server');
        console.log(socket.id);
    })

    socket.on('friends-invitations', (data) => { // data from server
        const {pendingInvitations} = data; 
        store.dispatch(setPendingFriendsInvitations(pendingInvitations));
    })

    socket.on('friends-list', (data) => {
        const {friends} = data;
        store.dispatch(setFriends(friends));
    })

    socket.on('online-users', (data) => { // come in every 8 sec
        const {onlineUsers} = data;
        store.dispatch(setOnlineUsers(onlineUsers));
    })

    socket.on('direct-chat-history', (data) => { // receive chat history
        updateDirectChatHistoryIfActive(data);
    })

    socket.on('room-create', (data) => {
        console.log('notify room creation');
        roomHandler.newRoomCreated(data);
    })

    socket.on('active-rooms', (data) => {
        console.log('notified as online user');
        roomHandler.updateActiveRooms(data);
    })

    socket.on('conn-prepare', (data) => {
        const {connUserSocketId} = data;
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, false);
        socket.emit('conn-init', {
            connUserSocketId: connUserSocketId}); // this id should initiate to all other users to prep for connection

    })

    socket.on('conn-init', (data) => {
        const {connUserSocketId} = data; // joiner receives, connID = other connector ids
        webRTCHandler.prepareNewPeerConnection(connUserSocketId, true);
    })

    socket.on('conn-signal', (data) => {
        webRTCHandler.handleSignalingData(data);
    })

    socket.on('room-participant-left', (data) => {
        console.log('user left room');
        webRTCHandler.handleParticipantLeftRoom(data);
    })

}

// emiter 
export const sendDirectMessage = (data) => {
    socket.emit('direct-message', data); // send to server, if receiver online he receives it, else saved in db
}

export const getDirectChatHistory = (data) => {
    socket.emit('direct-chat-history', data);
}

export const createNewRoom = () => {
    socket.emit('room-create');
}

export const joinRoom = (data) => {
    socket.emit('room-join', data);
    
}

export const leaveRoom = (data) => { // data is roomId
    socket.emit('room-leave', data);
}

export const signalPeerData = (data) => {
    socket.emit('conn-signal', data);
}