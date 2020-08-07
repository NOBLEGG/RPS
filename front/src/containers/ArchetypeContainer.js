import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Archetype from 'presentations/Archetype';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const ArchetypeContainer = ({match}) => {
    const dispatch = useDispatch();
    const archetype = useSelector(state => state.character.archetype);
    const archetypePerPage = useSelector(state => state.character.archetypePerPage);
    const currentPage = useSelector(state => state.character.currentPage);

    const reqPro = (id) => {
        dispatch(characterActions.postProUp({ subject: match.params.subject, id: id }));
    }

    const reqCon = (id) => {
        dispatch(characterActions.postConUp({ subject: match.params.subject, id: id }));
    }

    const postForm = (value) => {
        dispatch(characterActions.postArchetypeForm([value, match.params.subject]));
    }

    const handleClick = (num) => {
        dispatch(characterActions.paginationClick(num));
    }

    useEffect(() => {
        dispatch(characterActions.getArchetypeList(match.params.subject));
    }, [dispatch, match.params.subject]);

    return (
        <Archetype
            archetype={archetype}
            postForm={postForm}
            reqPro={reqPro}
            reqCon={reqCon}
            archetypePerPage={archetypePerPage}
            currentPage={currentPage}
            handleClick={handleClick}
        />
    );
}

export default ArchetypeContainer;