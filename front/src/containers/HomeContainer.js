import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Home from 'presentations/Home';
import * as homeActions from 'modules/home';

// 렌더링에 필요한 데이터를 fetching
const HomeContainer = () => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.home.list);
    const isStaff = useSelector(state => state.home.isStaff);

    useEffect(() => {
        dispatch(homeActions.getList());
    }, [dispatch]);

    return (
        <Home
            list={list}
            isStaff={isStaff}
        />
    );
}

export default HomeContainer;
