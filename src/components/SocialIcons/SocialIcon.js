import React from 'react';
import Icon from '@iconify/react';

const SocialIcon = (props) => (
    <div className={props.status ? 'on' : 'off'}>
        <div className="icon">
            <Icon icon={props.icon} />
        </div>
        <div className="status-indicator">
            <div></div>
            <div></div>
        </div>
    </div>
)

export default SocialIcon;