import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import IconBubble from './IconBubble';

import instagramIcon from '@iconify/icons-mdi/instagram';
import githubIcon from '@iconify/icons-mdi/github';
import codeJson from '@iconify/icons-mdi/code-json';
import codepenIcon from '@iconify/icons-mdi/codepen';

import styles from './NavItems.module.scss';

const NavItems = () => {

    const [hamburger, setHamburger] = useState( false );

    const toggleHamburgerHandler = () => {
        setHamburger( prevState => { return !prevState } )
    }

    return (
        <div className={styles.NavItems}>
            <div className={hamburger ? [styles.Backdrop, styles.isVisible].join(' ') : styles.Backdrop} onClick={toggleHamburgerHandler}></div>
            <ul className={hamburger ? styles.isOpen : null}>
                <li>
                    <NavLink to="/posts" activeClassName={styles.Active} exact onClick={toggleHamburgerHandler}>
                        <IconBubble icon={codeJson} text="[P] POSTS" delay=".2s" hamburger={hamburger} />
                    </NavLink>
                </li>
                <li>
                    <a href="https://instagram.com/pipe.view" target="_blank" rel="noopener noreferrer">
                        <IconBubble icon={instagramIcon} text="@pipe.view" delay=".3s" hamburger={hamburger} />
                    </a>
                </li>
                <li>
                    <a href="https://codepen.io/pipe-pen" target="_blank" rel="noopener noreferrer">
                        <IconBubble icon={codepenIcon} text="@pipe-pen" delay=".4s" hamburger={hamburger} />
                    </a>
                </li>
                <li>
                    <a href="https://github.com/pipe-code" target="_blank" rel="noopener noreferrer">
                        <IconBubble icon={githubIcon} text="@pipe-code" delay=".5s" hamburger={hamburger} />
                    </a>
                </li>
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