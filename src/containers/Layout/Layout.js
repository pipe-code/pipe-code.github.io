import React from 'react';
import Aux from '../../hoc/Aux';
import Logo from '../../components/Logo/Logo'

import styles from './Layout.module.scss';

const Layout = (props) => (
    <Aux>
        <div className={styles.Header}>
            <Logo />
        </div>
        {props.children}
        <div className="footer-wrapper"></div>
    </Aux>
)

export default Layout;