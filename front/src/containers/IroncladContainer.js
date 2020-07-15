import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Ironclad from 'presentations/Ironclad';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const IroncladContainer = ({match}) => {
    const dispatch = useDispatch();
    const data = useSelector(state => state.character.list);
    const opinion = data[0];
    const card = data[1];
    const archetype = data[2];

    useEffect(() => {
        dispatch(characterActions.getCharacter(match.params.subject));
    }, [dispatch, match.params.subject]);

    return (
        <Ironclad
            opinion={opinion}
            card={card}
            archetype={archetype}
        />
    );
}

export default IroncladContainer;