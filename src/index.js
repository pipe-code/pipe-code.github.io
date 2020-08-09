import React, { useState } from 'react';
import ReactDOM from 'react-dom';

import Loader from './components/Loader/Loader';
import Layout from './containers/Layout/Layout';
import Aux from './hoc/Aux';

import Home from './containers/Home/Home';

import './index.scss';

const Root = () => {

  const [loading, setLoading] = useState( true );

  return (
    <Aux>
      <Loader loading={loading}/>
      <Layout>
        <Home handleLoading={setLoading}/>
      </Layout>
    </Aux>
  )
}

ReactDOM.render(<Root />, document.getElementById('app'));