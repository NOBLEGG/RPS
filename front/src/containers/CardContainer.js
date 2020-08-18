import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'presentations/Card';
import * as cardActions from 'modules/card';

// 렌더링에 필요한 데이터를 fetching
const CardContainer = () => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.card.card);
    const filter = useSelector(state => state.card.filter);

    const changeRadio = (name, target) => {
        const names = document.getElementsByName(name);
        let len = document.getElementsByName(name).length;

        let temp = "";
        for (let i = 0; i < len; i++) {
            temp = names[i].value;
            filter[temp] = 0;
        }

        filter[target] = 1;
    }

    const changeCheckbox = (target) => {
        if (filter[target] === 1)
            filter[target] = 0;
        else
            filter[target] = 1;
    }

    const dispatcher = () => {
        dispatch(cardActions.changeFilter({ filter: filter }));
    }

    const reset = () => {
        const inp = document.getElementsByTagName('input');
        for (let i = 0; i < inp.length; i++)
            inp[i].checked = false;

        const filterKeys = Object.keys(filter);
        for (let i = 0; i < filterKeys.length; i++)
            filter[filterKeys[i]] = 0;
        
        dispatch(cardActions.changeFilter({ filter: filter }));
    }

    useEffect(() => {
        dispatch(cardActions.getList());
    }, [dispatch]);
    
    return (
        <Card
            card={card}
            changeRadio={changeRadio}
            changeCheckbox={changeCheckbox}
            dispatcher={dispatcher}
            reset={reset}
        />
    );
}

export default CardContainer;