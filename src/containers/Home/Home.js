import React, { useEffect } from 'react';
import imageLogo from '../../assets/pipe-bg.svg';
import Glitch from '../../components/Glitch/Glitch';

const Home = (props) => {

    useEffect(() => {
        document.title = props.title;
    }, [])

    return (
        <Glitch image={imageLogo} handleLoading={props.handleLoading} />
    )
}

export default Home;