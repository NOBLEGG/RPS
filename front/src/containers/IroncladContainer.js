import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ironclad from 'presentations/Ironclad';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const IroncladContainer = ({match}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.character.list);
    const keyword = useSelector(state => state.character.keyword);
    const opinion = data[0];
    const card = data[1];
    const archetype = data[2];

    const changeKeyword = (target) => {
        if (keyword[target] === 1)
            keyword[target] = 0;
        else
            keyword[target] = 1;
        dispatch(characterActions.changeKeyword({ subject: match.params.subject, keyword: keyword }));
    }

    useEffect(() => {
        dispatch(characterActions.getCharacter({ subject: match.params.subject, keyword: keyword }));
    }, [dispatch, match.params.subject, keyword]);
    
    return (
        <Ironclad
            opinion={opinion}
            card={card}
            archetype={archetype}
            changeKeyword={changeKeyword}
        />
    );
}

export default IroncladContainer;