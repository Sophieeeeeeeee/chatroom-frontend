import React, {useEffect} from 'react';
import {styled} from '@mui/system';
import Messages from './Messages/Messages';
import NewMessageInput from './NewMessageInput';
import { getDirectChatHistory } from '../../../realtimeCommunication/socketConnection';

const Wrapper = styled('div')({
    flexGrow: 1,
})

const MessengerContent = ({chosenChatDetails}) => {

    useEffect( () => {
        // fetch chat history from specific user id
        getDirectChatHistory({
            receiverUserId: chosenChatDetails.id
        }); 

    }, [chosenChatDetails] ) // everytime select different chat box, get chat history

    return (
        <Wrapper>
            <Messages />
            <NewMessageInput />
        </Wrapper>
    );
};

export default MessengerContent;