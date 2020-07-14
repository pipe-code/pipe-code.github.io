import React, { useEffect } from 'react';
import imagesLoaded from 'imagesloaded';
import GlitchImage from './GlitchImage';

const Glitch = (props) => {

    return (
        <div className="full-screen-glitch">
            <div className="content">
                <div className="glitch">
                    <GlitchImage image={props.image} />
                    <GlitchImage image={props.image} />
                    <GlitchImage image={props.image} />
                    <GlitchImage image={props.image} />
                    <GlitchImage image={props.image} />
                </div>
            </div>
        </div>
    );
}

export default Glitch;