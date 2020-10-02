import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Opinion from 'presentations/Opinion';
import * as opinionActions from 'modules/opinion';

// 렌더링에 필요한 데이터를 fetching
const OpinionContainer = ({match}) => {
    const dispatch = useDispatch();
    const character = match.params.character;
    const card = match.params.card;
    const relic = match.params.relic;
    const rating = useSelector(state => state.opinion.rating);
    const opinion = useSelector(state => state.opinion.opinion);
    const perPage = useSelector(state => state.opinion.perPage);
    const currentPage = useSelector(state => state.opinion.currentPage);

    const opinionStarClick = (nextValue) => {
        dispatch(opinionActions.opinionStarClick(nextValue));
    }

    const reqPro = (id) => {
        dispatch(opinionActions.postProUp([character, card, relic, id]));
    }

    const reqCon = (id) => {
        dispatch(opinionActions.postConUp([character, card, relic, id]));
    }

    const reqDel = (id) => {
        dispatch(opinionActions.postDelete(id));
    }

    const getName = () => {
        let value = '';
        const cookies = document.cookie.split(';');
        let x, y;
        for (let i = 0; i < cookies.length; i++) {
            x = cookies[i].substr(0, cookies[i].indexOf('='));
            y = cookies[i].substr(cookies[i].indexOf('=') + 1);
            x = x.replace(/^\s+|\s+$/g, '');
            if (x === 'name')
                value = y;
        }
        if (value === '') {
            alert('의견 등록은 로그인 후 가능합니다. 로그인 후 이용해 주세요.');
            throw new Error();
        }
        return value;
    }

    const postForm = (value) => {
        value.writer = getName();
        value.score = rating;
        if (relic === undefined) {
            if (card === undefined) {
                // 캐릭터에 대한 의견 제출
                dispatch(opinionActions.postOpinionForm([character, undefined, undefined, value]));
            }
            else {
                // 카드에 대한 의견 제출
                value.card_character = character;
                dispatch(opinionActions.postOpinionForm([character,      card, undefined, value]));
            }
        } else {
                // 유물에 대한 의견 제출
                value.relic = true;
                dispatch(opinionActions.postOpinionForm([undefined, undefined,     relic, value]));
        }
    }

    const handleClick = (num) => {
        dispatch(opinionActions.opinionPaginationClick(num));
    }

    useEffect(() => {
        dispatch(opinionActions.getOpinionList([character, card, relic]));
    }, [dispatch, character, card, relic]);

    return (
        <Opinion
            character={character}
            rating={rating}
            opinionStarClick={opinionStarClick}
            opinion={opinion}
            postForm={postForm}
            reqPro={reqPro}
            reqCon={reqCon}
            reqDel={reqDel}
            perPage={perPage}
            currentPage={currentPage}
            handleClick={handleClick}
        />
    );
}

export default OpinionContainer;
