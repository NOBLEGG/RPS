import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Archetype from 'presentations/Archetype';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const ArchetypeContainer = ({match}) => {
    const dispatch = useDispatch();
    const rating = useSelector(state => state.character.rating);
    const archetype = useSelector(state => state.character.archetype);
    const perPage = useSelector(state => state.character.perPage);
    const currentPage = useSelector(state => state.character.currentPage);

    const archetypeStarClick = (nextValue) => {
        dispatch(characterActions.archetypeStarClick(nextValue));
    }

    const reqPro = (id) => {
        dispatch(characterActions.postProUp({ subject: match.params.subject, id: id }));
    }

    const reqCon = (id) => {
        dispatch(characterActions.postConUp({ subject: match.params.subject, id: id }));
    }

    const postForm = (value) => {
        value.score = rating;
        dispatch(characterActions.postArchetypeForm([value, match.params.subject]));
    }

    const handleClick = (num) => {
        dispatch(characterActions.archetypePaginationClick(num));
    }

    useEffect(() => {
        dispatch(characterActions.getArchetypeList(match.params.subject));
    }, [dispatch, match.params.subject]);

    return (
        <Archetype
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