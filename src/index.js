import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Loader from './components/Loader/Loader';
import Logo from './components/Logo/Logo';
import Glitch from './components/Glitch/Glitch';
import Menu from './components/Menu/Menu';
import imageLogo from './assets/pipe-bg.svg';
import imagesLoaded from 'imagesloaded';

import './sass/styles.scss';

const Root = () => {

  const [loading, setLoading] = useState( true );

  useEffect(() => {
    imagesLoaded('body', { background: true }, () => {
        setLoading( false );
    });
  }, []);

  return (
    <div className={loading ? 'container loading' : 'container imgloaded'}>
        <Loader />
        <Logo />
        <Glitch image={imageLogo} />
        <Menu />
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('app'));