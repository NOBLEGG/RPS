import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Login from 'presentations/Login';
import * as loginActions from 'modules/login';

// 렌더링에 필요한 데이터를 fetching
const LoginContainer = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.login.isLogin);
    const errorMessage = useSelector(state => state.login.errorMessage);

    const postForm = (value) => {
        dispatch(loginActions.postForm(value));
    }

    /*
    const fbLogin = (response) => {
        dispatch(loginActions.fbLogin(response.accessToken));
    }

    const googleLogin = () => {
        dispatch(loginActions.googleLogin());
    }
    */

    return (
        <Login
            postForm={postForm}
            isLogin={isLogin}
            errorMessage={errorMessage}
        />
    );
}

export default LoginContainer;
