import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'presentations/Card';
import * as cardActions from 'modules/card';

// 렌더링에 필요한 데이터를 fetching
const CardContainer = () => {
    const dispatch = useDispatch();
    const cards = useSelector(state => state.card.cards);
    const keyword = useSelector(state => state.card.keyword);

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
            dispatch(cardActions.changeKeyword({ keyword: new_keyword }));
        } else {
            dispatch(cardActions.getList());
        }
    }

    useEffect(() => {
        dispatch(cardActions.getList());
    }, [dispatch]);
    
    return (
        <Card
            cards={cards}
            changeKeyword={changeKeyword}
        />
    );
}

export default CardContainer;