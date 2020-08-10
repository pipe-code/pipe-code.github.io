import React from 'react';

import styles from './Copyright.module.scss';

const Copyright = () => {
    const date = new Date();
    return (
        <div className={styles.Copyright}>
            © PIPE:CODE {date.getFullYear()}
        </div>
    )
}

export default Copyright;