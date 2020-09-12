import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SignUp from 'presentations/SignUp';
import * as signUpActions from 'modules/signUp';

// 렌더링에 필요한 데이터를 fetching
const SignUpContainer = () => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.signUp.errorMessage);

    const postForm = (value) => {
        dispatch(signUpActions.postForm(value));
    }

    return (
        <SignUp
            postForm={postForm}
            errorMessage={errorMessage}
        />
    );
}

export default SignUpContainer;
