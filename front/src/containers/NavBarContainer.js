import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import NavBar from 'presentations/NavBar';
import * as loginActions from 'modules/login';

const NavBarContainer = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector(state => state.navBar.isLogin);

    const verifyToken = () => {
        console.log("Requested verify token.");
        dispatch(loginActions.verifyToken);
    }

    return (
        <NavBar
            isLogin={isLogin}
        />
    );
}

export default NavBarContainer;