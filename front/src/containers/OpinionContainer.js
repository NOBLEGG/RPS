import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Opinion from 'presentations/Opinion';
import * as opinionActions from 'modules/opinion';

// 렌더링에 필요한 데이터를 fetching
const OpinionContainer = ({match}) => {
    const dispatch = useDispatch();
    const subject = match.params.subject;
    const rating = useSelector(state => state.opinion.rating);
    const opinion = useSelector(state => state.opinion.opinion);
    const perPage = useSelector(state => state.opinion.perPage);
    const currentPage = useSelector(state => state.opinion.currentPage);

    const opinionStarClick = (nextValue) => {
        dispatch(opinionActions.opinionStarClick(nextValue));
    }

    const reqPro = (id) => {
        dispatch(opinionActions.postProUp({ subject: subject, id: id }));
    }

    const reqCon = (id) => {
        dispatch(opinionActions.postConUp({ subject: subject, id: id }));
    }

    const postForm = (value) => {
        value.score = rating;
        dispatch(opinionActions.postOpinionForm([value, subject]));
    }

    const handleClick = (num) => {
        dispatch(opinionActions.opinionPaginationClick(num));
    }

    useEffect(() => {
        dispatch(opinionActions.getOpinionList(subject));
    }, [dispatch, subject]);

    return (
        <Opinion
            subject={subject}
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