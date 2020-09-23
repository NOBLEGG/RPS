import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from 'presentations/NavBar';
import * as loginActions from 'modules/login';

const NavBarContainer = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.login.isLogin);

    useEffect(() => {
        dispatch(loginActions.verifyToken());
    }, [dispatch]);

    return (
        <NavBar
            isLogin={isLogin}
        />
    );
}

export default NavBarContainer;
