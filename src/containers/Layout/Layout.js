import React from 'react';
import Aux from '../../hoc/Aux';
import Logo from '../../components/Logo/Logo'

const Layout = (props) => (
    <Aux>
        <div className="header-wrapper">
            <Logo />
        </div>
        {props.children}
        <div className="footer-wrapper"></div>
    </Aux>
)

export default Layout;