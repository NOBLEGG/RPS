import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Silent from 'presentations/Silent';
import * as characterActions from 'modules/character';

// 렌더링에 필요한 데이터를 fetching
const SilentContainer = () => {
    const dispatch = useDispatch();
    const opinion = useSelector(state => state.character.opinion);
    const card = useSelector(state => state.character.card);
    const filter = useSelector(state => state.character.filter);
    const archetype = useSelector(state => state.character.archetype);
    const currentPage = useSelector(state => state.character.currentPage);

    const reqPro = (id) => {
        dispatch(characterActions.postProUp({ subject: 'silent', id: id }));
    }

    const reqCon = (id) => {
        dispatch(characterActions.postConUp({ subject: 'silent', id: id }));
    }

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
        dispatch(characterActions.changeFilter({ subject: 'silent', filter: filter }));
    }

    const reset = () => {
        const inp = document.getElementsByTagName('input');
        for (let i = 0; i < inp.length; i++)
            inp[i].checked = false;

        const filterKeys = Object.keys(filter);
        for (let i = 0; i < filterKeys.length; i++)
            filter[filterKeys[i]] = 0;
        
        dispatch(characterActions.changeFilter({ subject: 'silent', filter: filter }));
    }

    const handlePage = (page) => {
        dispatch(characterActions.paginationClick(page));
    }

    useEffect(() => {
        dispatch(characterActions.getCharacter({ subject: 'silent' }));
    }, [dispatch]);
    
    return (
        <Silent
            opinion={opinion}
            reqPro={reqPro}
            reqCon={reqCon}
            card={card}
            archetype={archetype}
            changeRadio={changeRadio}
            changeCheckbox={changeCheckbox}
            dispatcher={dispatcher}
            reset={reset}
            currentPage={currentPage}
            handlePage={handlePage}
        />
    );
}

export default SilentContainer;
