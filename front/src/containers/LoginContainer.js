import React from 'react';
import { useDispatch } from 'react-redux';

import Login from 'presentations/Login';
import * as loginActions from 'modules/login';

// 렌더링에 필요한 데이터를 fetching
const LoginContainer = () => {
    const dispatch = useDispatch();

    const fbLogin = (response) => {
        dispatch(loginActions.fbLogin(response.accessToken));
    }

    const googleLogin = () => {
        dispatch(loginActions.googleLogin());
    }

    return (
        <Login
            fbLogin={fbLogin}
            googleLogin={googleLogin}
        />
    );
}

export default LoginContainer;