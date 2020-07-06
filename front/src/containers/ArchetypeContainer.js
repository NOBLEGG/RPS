import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Archetype from 'presentations/Archetype';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const ArchetypeContainer = ({match}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.character.list);

    const postForm = (value) => {
        dispatch(characterActions.postArchetypeForm([value, match.params.subject]));
    }

    useEffect(() => {
        dispatch(characterActions.getArchetypeList(match.params.subject));
    }, [dispatch, match.params.subject]);

    return (
        <Archetype
            data={data}
            postForm={postForm}
        />
    );
}

export default ArchetypeContainer;