import React, {useEffect, useState} from 'react';
import AuthBox from '../shared/components/AuthBox';
import LoginPageFooter from './LoginPageFooter';
import LoginPageHeader from './LoginPageHeader';
import LoginPageInputs from './LoginPageInputs';
import { validateLoginForm } from '../shared/utils/validators';

import { connect } from 'react-redux';
import { getActions } from '../../store/actions/authAction';
import {useNavigate} from 'react-router-dom';

const LoginPage = ({login}) => {  // we only need login action

    const history = useNavigate();

    const [mail, setMail] = useState('');
    const[password, setPassword] = useState("");

    const [isFormValid, setIsFormValid] = useState(false);
    const handleLogin = () => {
        const userDetails = {
            mail,
            password,
        }
        login(userDetails, history); // calling this function dispatch an action to store
    }

    useEffect(() => {
        setIsFormValid(validateLoginForm({mail, password}));
    }, [mail, password, setIsFormValid]);

    return (
        <AuthBox>
            <LoginPageHeader/>
            <LoginPageInputs 
                mail = {mail}
                setMail = {setMail}
                password = {password}
                setPassword = {setPassword}
            />
            <LoginPageFooter 
                isFormValid={isFormValid}
                handleLogin={handleLogin}
            />
        </AuthBox>
    );
};

const mapActionsToProps = (dispatch) => {
    return {
        ...getActions(dispatch), //sends dispatch to the functions 
    }
}

export default connect(null, mapActionsToProps)(LoginPage); // connect gives mapping function dispatch, connects component to store, maps actions to component's props