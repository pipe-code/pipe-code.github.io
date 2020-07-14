import React from 'react';

const GlitchImage = (props) => {

    const style = {
        backgroundImage: `url(${props.image})`
    }

    return <div className="glitch-img" style={style}></div>
}

export default GlitchImage;