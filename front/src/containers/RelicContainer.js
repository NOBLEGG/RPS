import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Relic from 'presentations/Relic';

// 렌더링에 필요한 데이터를 fetching
const RelicContainer = () => {
    const dispatch = useDispatch();
    
    return (
        <Relic
        />
    );
}

export default RelicContainer;