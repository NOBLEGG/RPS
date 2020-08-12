import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Archetype from 'presentations/Archetype';
import * as archetypeActions from 'modules/archetype';

// 렌더링에 필요한 데이터를 fetching
const ArchetypeContainer = ({match}) => {
    const dispatch = useDispatch();
    const subject = match.params.subject;
    const rating = useSelector(state => state.archetype.rating);
    const archetype = useSelector(state => state.archetype.archetype);
    const perPage = useSelector(state => state.archetype.perPage);
    const currentPage = useSelector(state => state.archetype.currentPage);

    const archetypeStarClick = (nextValue) => {
        dispatch(archetypeActions.archetypeStarClick(nextValue));
    }

    const reqPro = (id) => {
        dispatch(archetypeActions.postProUp({ subject: subject, id: id }));
    }

    const reqCon = (id) => {
        dispatch(archetypeActions.postConUp({ subject: subject, id: id }));
    }

    const postForm = (value) => {
        value.score = rating;
        dispatch(archetypeActions.postArchetypeForm([value, subject]));
    }

    const handleClick = (num) => {
        dispatch(archetypeActions.archetypePaginationClick(num));
    }

    useEffect(() => {
        dispatch(archetypeActions.getArchetypeList(subject));
    }, [dispatch, subject]);

    return (
        <Archetype
            subject={subject}
            rating={rating}
            archetypeStarClick={archetypeStarClick}
            archetype={archetype}
            postForm={postForm}
            reqPro={reqPro}
            reqCon={reqCon}
            perPage={perPage}
            currentPage={currentPage}
            handleClick={handleClick}
        />
    );
}

export default ArchetypeContainer;