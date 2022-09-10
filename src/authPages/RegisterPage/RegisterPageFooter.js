import React from 'react';
import CustomPrimaryButton from '../shared/components/CustomPrimaryButton';
import {useNavigate} from 'react-router-dom';
import RedirectInfo  from '../shared/components/RedirectInfo';
import {Tooltip} from '@mui/material';

const getFormNotValidMessage = () => {
    return 'Username should contain 3-12 char and password should contain 6-12 char.\n Correct email address should be provided.';
};
const getFormValidMessage = () => {
    return 'Press to register!';

};

const RegisterPageFooter = ({handleRegister, isFormValid}) => {

    const navigate = useNavigate();
    const handlePushToLoginPage = () => {
        navigate('/login');
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
                        label = 'Register'
                        additionalStyles={{marginTop: '36px'}}
                        disabled = {!isFormValid}
                        onClick = {handleRegister}
                    />
                </div>
            </div>
        </Tooltip>
        <RedirectInfo
            text='Already have an account?'
            redirectText = ' Create an account'
            additionalStyles={{marginTop: '5px'}}
            redirectHandler = {handlePushToLoginPage}
        />
        </>
    );
};

export default RegisterPageFooter;