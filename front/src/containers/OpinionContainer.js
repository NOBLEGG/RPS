import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Opinion from 'presentations/Opinion';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const OpinionContainer = ({match}) => {
    const dispatch = useDispatch();
    const rating = useSelector(state => state.character.rating);
    const opinion = useSelector(state => state.character.opinion);
    const perPage = useSelector(state => state.character.perPage);
    const currentPage = useSelector(state => state.character.currentPage);

    const opinionStarClick = (nextValue) => {
        dispatch(characterActions.opinionStarClick(nextValue));
    }

    const reqPro = (id) => {
        dispatch(characterActions.postProUp({ subject: match.params.subject, id: id }));
    }

    const reqCon = (id) => {
        dispatch(characterActions.postConUp({ subject: match.params.subject, id: id }));
    }

    const postForm = (value) => {
        value.score = rating;
        dispatch(characterActions.postOpinionForm([value, match.params.subject]));
    }

    const handleClick = (num) => {
        dispatch(characterActions.opinionPaginationClick(num));
    }

    useEffect(() => {
        dispatch(characterActions.getOpinionList(match.params.subject));
    }, [dispatch, match.params.subject]);

    return (
        <Opinion 
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