import React from 'react';

import styles from './Loader.module.scss';

const Loader = (props) => (
    <div className={props.loading ? [styles.Container, styles.Loading].join(' ') : [styles.Container, styles.Loaded].join(' ')}>
        <div className={styles.Loader}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    </div>
)

export default Loader;