import React from 'react';
import Icon from '@iconify/react';

import styles from './IconBubble.module.scss';

const IconBubble = (props) => {

    let bubbleStyle = {};
    if(window.innerWidth < 992 && props.hamburger) {
        bubbleStyle = {
            opacity: 1,
            left: 50,
            visibility: 'visible',
            transitionDelay: props.delay
        };
    }

    return (
        <div className={styles.IconBubble}>
            <Icon icon={props.icon} />
            <div className={styles.Bubble} style={bubbleStyle}>
                {props.text}
            </div>
        </div>
    )
}

export default IconBubble