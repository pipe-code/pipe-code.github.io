import React from 'react';
import Aux from '../../hoc/Aux';
import Logo from '../../components/Logo/Logo'
import NavItems from '../../components/NavItems/NavItems';

import styles from './Layout.module.scss';

const Layout = (props) => (
    <Aux>
        <div className={styles.Header}>
            <Logo />
            <NavItems />
        </div>
        {props.children}
        <div className="footer-wrapper"></div>
    </Aux>
)

export default Layout;