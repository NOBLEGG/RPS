import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UpdatePw from 'presentations/UpdatePw';
import * as updatePwActions from 'modules/updatePw';

// 렌더링에 필요한 데이터를 fetching
const UpdatePwContainer = () => {
    const dispatch = useDispatch();
    const isSuccess = useSelector(state => state.updatePw.isSuccess);
    const errorMessage = useSelector(state => state.updatePw.errorMessage);

    const postForm = (value) => {
        dispatch(updatePwActions.postForm(value));
    }

    const alerted = () => {
        dispatch(updatePwActions.alerted());
    }

    return (
        <UpdatePw
            postForm={postForm}
            isSuccess={isSuccess}
            errorMessage={errorMessage}
            alerted={alerted}
        />
    );
}

export default UpdatePwContainer;
