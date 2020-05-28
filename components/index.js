import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Loader from './Loader/Loader';
import Logo from './Logo/Logo';
import Glitch from './Glitch/Glitch';
import Menu from './Menu/Menu';

import '../sass/styles.scss';

class Root extends Component {
  render() {
    return (
        <div className="container loading">
            <Loader />
            <Logo />
            <Glitch image="./images/pipe-bg.svg" />
            <Menu />
        </div>
    )
  }
}

ReactDOM.render(<Root />, document.getElementById('app'));