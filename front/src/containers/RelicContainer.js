import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Relic from 'presentations/Relic';
import * as relicActions from 'modules/relic';

import { Link } from 'react-router-dom';

// 렌더링에 필요한 데이터를 fetching
const RelicContainer = () => {
    /*
    const dispatch = useDispatch();
    const relic = useSelector(state => state.relic.relic);
    const filter = useSelector(state => state.relic.filter);

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
        dispatch(relicActions.changeFilter({ filter: filter }));
    }

    const reset = () => {
        const inp = document.getElementsByTagName('input');
        for (let i = 0; i < inp.length; i++)
            inp[i].checked = false;

        const filterKeys = Object.keys(filter);
        for (let i = 0; i < filterKeys.length; i++)
            filter[filterKeys[i]] = 0;

        dispatch(relicActions.changeFilter({ filter: filter }));
    }

    useEffect(() => {
        dispatch(relicActions.getList());
    }, [dispatch]);

    return (
        <Relic
            relic={relic}
            changeRadio={changeRadio}
            changeCheckbox={changeCheckbox}
            dispatcher={dispatcher}
            reset={reset}
        />
    );
    */
    alert("준비중입니다.");
    return (
        <Link to="/"></Link>
    );
}

export default RelicContainer;
