import React from 'react';
import CustomPrimaryButton from '../shared/components/CustomPrimaryButton';
import {useNavigate} from 'react-router-dom';
import RedirectInfo  from '../shared/components/RedirectInfo';
import {Tooltip} from '@mui/material';

const getFormNotValidMessage = () => {
    return 'Enter corrrect email address and password shouold contain 6-12 char.';
};
const getFormValidMessage = () => {
    return 'Press to log in!';

};

const LoginPageFooter = ({handleLogin, isFormValid}) => {

    const navigate = useNavigate();
    const handlePushToRegisterPage = () => {
        navigate('/register');
    }

    return (
        <>
        <Tooltip
            title={!isFormValid ? 
                getFormNotValidMessage() : getFormValidMessage()}
        >
            <div>
                <div>
                    <CustomPrimaryButton 
                        label = 'Log in'
                        additionalStyles={{marginTop: '36px'}}
                        disabled = {!isFormValid}
                        onClick = {handleLogin}
                    />
                </div>
            </div>
        </Tooltip>
        <RedirectInfo
            text='Need an account?'
            redirectText = ' Create an account'
            additionalStyles={{marginTop: '5px'}}
            redirectHandler = {handlePushToRegisterPage}
        />
        </>
    );
};

export default LoginPageFooter;