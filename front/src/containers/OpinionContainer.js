import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Opinion from 'presentations/Opinion';
import * as opinionActions from 'modules/opinion';

// 렌더링에 필요한 데이터를 fetching
const OpinionContainer = ({match}) => {
    const dispatch = useDispatch();
    const character = match.params.character;
    const card = match.params.card;
    const rating = useSelector(state => state.opinion.rating);
    const opinion = useSelector(state => state.opinion.opinion);
    const perPage = useSelector(state => state.opinion.perPage);
    const currentPage = useSelector(state => state.opinion.currentPage);

    const opinionStarClick = (nextValue) => {
        dispatch(opinionActions.opinionStarClick(nextValue));
    }

    const reqPro = (id) => {
        dispatch(opinionActions.postProUp([character, card, id]));
    }

    const reqCon = (id) => {
        dispatch(opinionActions.postConUp([character, card, id]));
    }

    const postForm = (value) => {
        value.score = rating;

        if (card === undefined)
            dispatch(opinionActions.postOpinionForm([character, card, value]));
        else {
            value.card_character = character;
            dispatch(opinionActions.postOpinionForm([character, card, value]));
        }
    }

    const handleClick = (num) => {
        dispatch(opinionActions.opinionPaginationClick(num));
    }

    useEffect(() => {
        dispatch(opinionActions.getOpinionList([character, card]));
    }, [dispatch, character, card]);

    return (
        <Opinion
            character={character}
            rating={rating}
            opinionStarClick={opinionStarClick}
            opinion={opinion}
            postForm={postForm}
            reqPro={reqPro}
            reqCon={reqCon}
            perPage={perPage}
            currentPage={currentPage}
            handleClick={handleClick}
        />
    );
}

export default OpinionContainer;