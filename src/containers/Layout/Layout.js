import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux';
import Logo from '../../components/Logo/Logo'
import NavItems from '../../components/NavItems/NavItems';
import Copyright from '../../components/Copyright/Copyright';

import styles from './Layout.module.scss';

const Layout = (props) => {

    const [scrolling, setScrolling] = useState( false );

    const handleScroll = (event) => {
        if(window.scrollY > 60) setScrolling( true );
        else setScrolling( false );
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <Aux>
            <div className={scrolling ? [styles.Header, styles.isScrolling].join(' ') : styles.Header}>
                <Logo />
                <NavItems />
            </div>
            {props.children}
            <div className={styles.Footer}>
                <Copyright />
            </div>
        </Aux>
    )
}

export default Layout;