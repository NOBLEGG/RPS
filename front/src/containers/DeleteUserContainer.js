import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DeleteUser from 'presentations/DeleteUser';
import * as deleteUserActions from 'modules/deleteUser';

const DeleteUserContainer = () => {
    const dispatch = useDispatch();
    const isSuccess = useSelector(state => state.deleteUser.isSuccess);
    const errorMessage = useSelector(state => state.deleteUser.errorMessage);

    const postForm = (value) => {
        dispatch(deleteUserActions.postForm(value));
    }

    const alerted = () => dispatch(deleteUserActions.alerted());

    return (
        <DeleteUser
            postForm={postForm}
            isSuccess={isSuccess}
            errorMessage={errorMessage}
            alerted={alerted}
        />
    );
}

export default DeleteUserContainer;
