import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import Loader from './components/Loader/Loader';
import imagesLoaded from 'imagesloaded';
import Layout from './containers/Layout/Layout';

import Home from './containers/Home/Home';

import './sass/styles.scss';

const Root = () => {

  const [loading, setLoading] = useState( true );

  useEffect(() => {
    imagesLoaded('body', { background: true }, () => {
        setLoading( false );
    });
  }, []);

  return (
    <div className={loading ? 'loading' : 'imgloaded'}>
        <Loader />
        <Layout>
          <Home />
        </Layout>
    </div>
  )
}

ReactDOM.render(<Root />, document.getElementById('app'));