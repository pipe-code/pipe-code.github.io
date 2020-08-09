import React from 'react';
import Aux from '../../hoc/Aux';
import imageLogo from '../../assets/pipe-bg.svg';
import Glitch from '../../components/Glitch/Glitch';

const Home = (props) => (
    <Aux>
        <Glitch image={imageLogo} handleLoading={props.handleLoading} />
    </Aux>
)

export default Home;