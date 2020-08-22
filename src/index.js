import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Loader from './components/Loader/Loader';
import Layout from './containers/Layout/Layout';
import Aux from './hoc/Aux';

import Home from './containers/Home/Home';
import Posts from './containers/Posts/Posts';
import SinglePost from './containers/SinglePost/SinglePost';

import './index.scss';

const Root = () => {

  const [loading, setLoading] = useState( true );

  return (
    <Aux>
      <Loader loading={loading}/>
      <HashRouter>
        <Layout>

          <Switch>

            <Route path="/" exact>
              <Home handleLoading={setLoading} title="PIPE:CODE" />
            </Route>

            <Route path="/posts" exact>
              <Posts handleLoading={setLoading} title="PIPE:CODE | POSTS" />
            </Route>

            <Route path="/posts/:id" exact render={
              (props) => <SinglePost handleLoading={setLoading} {...props} />
            } />

            <Redirect to="/" />

          </Switch>
        
        </Layout>
      </HashRouter>
    </Aux>
  )
}

ReactDOM.render(<Root />, document.getElementById('app'));