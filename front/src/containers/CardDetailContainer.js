import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardDetail from 'presentations/CardDetail';
import * as cardActions from 'modules/card';

// 렌더링에 필요한 데이터를 fetching
const CardDetailContainer = ({match}) => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.card.card);
    const opinion = useSelector(state => state.card.opinion);

    useEffect(() => {
        let formatter = match.params.subject;
        formatter = formatter.replace(/ /g, '_');
        dispatch(cardActions.getDetail(formatter));
    }, [dispatch, match.params.subject]);

    return (
        <CardDetail
            card={card}
            opinion={opinion}
        />
    );
}

export default CardDetailContainer;