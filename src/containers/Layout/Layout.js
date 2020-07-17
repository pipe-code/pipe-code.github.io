import React from 'react';
import Aux from '../../hoc/Aux';
import Logo from '../../components/Logo/Logo'

const Layout = (props) => (
    <Aux>
        <header>
            <Logo />
        </header>
        {props.children}
        <footer></footer>
    </Aux>
)

export default Layout;