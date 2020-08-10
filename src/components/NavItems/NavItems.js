import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItems.module.scss';

const NavItems = () => {

    const [hamburger, setHamburger] = useState( false );

    const toggleHamburgerHandler = () => {
        setHamburger( prevState => { return !prevState } )
    }

    return (
        <div className={styles.NavItems}>
            <ul className={hamburger ? styles.isOpen : null}>
                <li><NavLink to="/posts" activeClassName={styles.Active} exact onClick={toggleHamburgerHandler}>Posts</NavLink></li>
            </ul>
            <div className={hamburger ? [styles.Hamburger, styles.isActive].join(' ') : styles.Hamburger} onClick={toggleHamburgerHandler}>
                <div className={styles.box}>
                    <div className={styles.inner}></div>
                </div>
            </div>
        </div>
    )
}

export default NavItems;