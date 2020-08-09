import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import Layout from './containers/Layout/Layout';
import Aux from './hoc/Aux';

import Home from './containers/Home/Home';
import Posts from './containers/Posts/Posts';

import './index.scss';

const Root = () => {

  const [loading, setLoading] = useState( true );

  return (
    <Aux>
      <Loader loading={loading}/>
      <HashRouter>
        <Layout>

          <Route path="/" exact>
            <Home handleLoading={setLoading} />
          </Route>

          <Route path="/posts" exact>
            <Posts handleLoading={setLoading} />
          </Route>

        </Layout>
      </HashRouter>
    </Aux>
  )
}

ReactDOM.render(<Root />, document.getElementById('app'));