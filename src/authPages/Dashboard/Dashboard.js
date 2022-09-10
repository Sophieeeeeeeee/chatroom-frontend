import React, {useEffect} from 'react';
import {styled} from '@mui/system';

import SideBar from './SideBar/SideBar';
import FriendsSideBar from './FriendsSideBar/FriendsSidebar';
import Messenger from './Messenger/Messenger';
import AppBar from './AppBar/AppBar';
import Room from './Room/Room';
import { logout } from '../shared/utils/auth';

import {connect} from 'react-redux';
import {getActions} from '../../store/actions/authAction';
import { connectWithSocketServer } from '../../realtimeCommunication/socketConnection';

const Wrapper = styled('div')({
    width: '100%',
    height: '100vh',
    display: 'flex'
})

const Dashboard = ({ setUserDetails, isUserInRoom }) => {
    useEffect(() => { // program starts executes once
        const userDetails = localStorage.getItem('user');
        if(!userDetails){
            logout();
        } else {
            setUserDetails(JSON.parse(userDetails));
            // connect with socket server
            connectWithSocketServer(JSON.parse(userDetails));
        }
    }, [])

    return (

        <Wrapper>
            <SideBar />
            <FriendsSideBar />
            <Messenger />
            <AppBar />
            {isUserInRoom && <Room/>}
        </Wrapper>
    );
};

const mapActionsToProps = (dispatch) => {
    return{
        ...getActions(dispatch),
    }
}

const mapStoreStateToProps = ({room}) => {
    return {
        ...room
    }
}

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);