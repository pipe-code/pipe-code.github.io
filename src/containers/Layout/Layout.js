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
            <header className={scrolling ? [styles.Header, styles.isScrolling].join(' ') : styles.Header}>
                <div className={styles.Container}>
                    <nav>
                        <Logo />
                        <NavItems />
                    </nav>
                </div>
            </header>
            <main>
                <div className={styles.Container}>
                    {props.children}
                </div>
            </main>
            <footer className={styles.Footer}>
                <div className={styles.Container}>
                    <Copyright />
                </div>
            </footer>
        </Aux>
    )
}

export default Layout;