import React from 'react';
import Aux from '../../hoc/Aux';
import SocialIcons from '../../components/SocialIcons/SocialIcons';
import imageLogo from '../../assets/pipe-bg.svg';
import Glitch from '../../components/Glitch/Glitch';

const Home = () => (
    <Aux>
        <Glitch image={imageLogo} />
        <SocialIcons />
    </Aux>
)

export default Home;