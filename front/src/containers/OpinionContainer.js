import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Opinion from 'presentations/Opinion';
import * as characterActions from 'modules/character';

import { useForm } from 'react-hook-form';

// 렌더링에 필요한 데이터를 fetching
const OpinionContainer = ({match}) => {
    const dispatch = useDispatch();
    const list = useSelector(state => state.character.list);

    /*
    const { register, handleSubmit, control } = useForm();
    const postForm = data => {
        dispatch(characterActions.postForm(match.params.subject));
    };
    */

    const postForm = (value) => {
        console.log(value);
        setTimeout(function() {
            alert('TIME OUT');
        }, 10000);
        
        /*
        useEffect(() => {
            dispatch(characterActions.postForm(match.params.subject));
        }, [dispatch, match.params.subject]);
        */
    }

    useEffect(() => {
        dispatch(characterActions.getList(match.params.subject));
    }, [dispatch, match.params.subject]);

    return (
        <Opinion 
            list={list}
            postForm={postForm}
        />
    );
}

export default OpinionContainer;