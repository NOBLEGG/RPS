import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Opinion from 'presentations/Opinion';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const OpinionContainer = ({match}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.character.list);

    const postForm = (value) => {
        dispatch(characterActions.postOpinionForm([value, match.params.subject]));
    }

    useEffect(() => {
        dispatch(characterActions.getOpinionList(match.params.subject));
    }, [dispatch, match.params.subject]);

    return (
        <Opinion 
            data={data}
            postForm={postForm}
        />
    );
}

export default OpinionContainer;