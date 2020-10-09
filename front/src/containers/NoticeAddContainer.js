import React from 'react';
import { useDispatch } from 'react-redux';

import NoticeAdd from 'presentations/NoticeAdd';
import * as noticeAddActions from 'modules/noticeAdd';

// 렌더링에 필요한 데이터를 fetching
const NoticeAddContainer = () => {
    const dispatch = useDispatch();

    const postForm = (value) => {
        dispatch(noticeAddActions.postForm(value));
    }

    return (
        <NoticeAdd
            postForm={postForm}
        />
    );
}

export default NoticeAddContainer;

