import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import HomeDetail from 'presentations/HomeDetail';
import * as homeActions from 'modules/home';

// 렌더링에 필요한 데이터를 fetching
const HomeDetailContainer = ({match}) => {
    const dispatch = useDispatch();
    const item = useSelector(state => state.home.item);

    useEffect(() => {
        dispatch(homeActions.getDetail(match.params.id));
    }, []);

    console.log(item);

    return (
        <HomeDetail
            item={item}
        />
    );
}

export default HomeDetailContainer;