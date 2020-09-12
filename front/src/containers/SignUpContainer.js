import React from 'react';
import { useDispatch } from 'react-redux';

import SignUp from 'presentations/SignUp';
import * as signUpActions from 'modules/signUp';

// 렌더링에 필요한 데이터를 fetching
const SignUpContainer = () => {
    const dispatch = useDispatch();

    const postForm = (value) => {
        dispatch(signUpActions.postForm(value));
    }

    return (
        <SignUp
            postForm={postForm}
        />
    );
}

export default SignUpContainer;