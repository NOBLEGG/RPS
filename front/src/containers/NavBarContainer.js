import React from 'react';
import { useSelector } from 'react-redux';

const NavBarContainer = () => {
    const isLogin = useSelector(state => state.login.isLogin);

    return (
        <NavBar
            isLogin={isLogin}
        />
    );
}

export default NavBarContainer;
