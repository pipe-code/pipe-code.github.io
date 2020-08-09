import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Logo.module.scss';

const Logo = () => (
    <div className={styles.Logo}>
        <NavLink to="/" exact>
            <h1>[PIPE:CODE]</h1>
        </NavLink>
    </div>
) 

export default Logo;