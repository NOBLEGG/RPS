import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CardDetail from 'presentations/CardDetail';
import * as cardDetailActions from 'modules/cardDetail';

// 렌더링에 필요한 데이터를 fetching
const CardDetailContainer = ({match}) => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.cardDetail.card);
    const opinion = useSelector(state => state.cardDetail.opinion);

    let cardFormatter = match.params.card;
    cardFormatter = cardFormatter.replace(/ /g, '_');

    const reqPro = (id) => {
        dispatch(cardDetailActions.postProUp({ character: match.params.character, card: cardFormatter, id: id }));
    }

    const reqCon = (id) => {
        dispatch(cardDetailActions.postConUp({ character: match.params.character, card: cardFormatter, id: id }));
    }

    useEffect(() => {
        dispatch(cardDetailActions.getDetail({ character: match.params.character, card: cardFormatter }));
    }, [dispatch, match.params.character, cardFormatter]);

    return (
        <CardDetail
            card={card}
            opinion={opinion}
            reqPro={reqPro}
            reqCon={reqCon}
        />
    );
}

export default CardDetailContainer;