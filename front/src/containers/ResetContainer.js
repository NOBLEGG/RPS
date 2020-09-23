import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Reset from 'presentations/Reset';
import * as resetActions from 'modules/reset';

const ResetContainer = ({match}) => {
    const dispatch = useDispatch();
    const errorMessage = useSelector(state => state.reset.errorMessage);
    const isSuccess = useSelector(state => state.reset.isSuccess);

    const uid = match.params.uid;
    const token = match.params.token;

    const postForm = (value) => {
        dispatch(resetActions.postForm(value));
    }

    const resetConfirm = (value) => {
        dispatch(resetActions.resetConfirm({ uid: uid, token: token, value: value }));
    }

    const alerted = () => {
        dispatch(resetActions.alerted());
    }

    return (
        <Reset
            resetConfirm={resetConfirm}
            postForm={postForm}
            errorMessage={errorMessage}
            uid={uid}
            token={token}
            isSuccess={isSuccess}
            alerted={alerted}
        />
    );
}

export default ResetContainer;
