import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import RelicDetail from 'presentations/RelicDetail';
import * as relicDetailActions from 'modules/relicDetail';

// 렌더링에 필요한 데이터를 fetching
const RelicDetailContainer = ({match}) => {
    const dispatch = useDispatch();
    const relic = useSelector(state => state.relicDetail.relic);
    const opinion = useSelector(state => state.relicDetail.opinion);

    let relicFormatter = match.params.relic;
    relicFormatter = relicFormatter.replace(/ /g, '_');

    const reqPro = (id) => {
        dispatch(relicDetailActions.postProUp({ relic: relicFormatter, id: id }));
    }

    const reqCon = (id) => {
        dispatch(relicDetailActions.postConUp({ relic: relicFormatter, id: id }));
    }

    useEffect(() => {
        dispatch(relicDetailActions.getDetail(relicFormatter));
    }, [dispatch, relicFormatter]);

    return (
        <RelicDetail
            relic={relic}
            opinion={opinion}
            reqPro={reqPro}
            reqCon={reqCon}
        />
    );
}

export default RelicDetailContainer;