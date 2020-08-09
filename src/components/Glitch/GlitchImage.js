import React from 'react';

import styles from './GlitchImage.module.scss';

const GlitchImage = (props) => {

    const bg_image = {
        backgroundImage: `url(${props.image})`
    }

    return <div className={styles.Glitch_img} style={bg_image}></div>
}

export default GlitchImage;