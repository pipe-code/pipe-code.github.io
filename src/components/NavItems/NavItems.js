import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NavItems.module.scss';

const NavItems = () => {
    return (
        <div className={styles.NavItems}>
            <ul>
                <li><NavLink to="/posts" activeClassName={styles.Active} exact>Posts</NavLink></li>
            </ul>
        </div>
    )
}

export default NavItems;