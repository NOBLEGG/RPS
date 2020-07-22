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

        let one_counter = 0;
        const keyword_values = Object.values(keyword);
        for (let i = 0; i < keyword_values.length; i++) {
            if (keyword_values[i] === 1)
                one_counter++;
        }

        if (one_counter > 0) {
            let new_keyword = "";
            const keyword_keys = Object.keys(keyword);
            for (let i = 0; i < keyword_values.length; i++) {
                if (keyword_values[i] === 1) {
                    new_keyword += '"' + keyword_keys[i] + '":1';
                    one_counter--;
                    if (one_counter !== 0)
                        new_keyword += ",";
                }
            }
            dispatch(characterActions.changeKeyword({ subject: match.params.subject, keyword: new_keyword }));
        } else {
            dispatch(characterActions.getCharacter({ subject: match.params.subject }));
        }
    }

    useEffect(() => {
        dispatch(characterActions.getCharacter({ subject: match.params.subject }));
    }, [dispatch, match.params.subject]);
    
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