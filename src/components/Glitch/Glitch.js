import React, { useEffect } from 'react';
import imagesLoaded from 'imagesloaded';
import GlitchImage from './GlitchImage';

import styles from './Glitch.module.scss';

const Glitch = (props) => {

    useEffect(() => {
        imagesLoaded('.full-screen-glitch', { background: true }, () => {
            props.handleLoading( false );
        });
    }, []);

    return (
        <div className={styles.Glitch}>
            <GlitchImage image={props.image} />
            <GlitchImage image={props.image} />
            <GlitchImage image={props.image} />
            <GlitchImage image={props.image} />
            <GlitchImage image={props.image} />
        </div>
    );
}

export default Glitch;