"use strict";

import { Glitch, Loader, Logo, Menu } from './components';

const Root = (props) => {
    return (
        <div className="container loading">
            <Loader />
            <Logo />
            <Glitch image="./images/pipe-bg.svg" />
            <Menu />
        </div>
    )
};
 
ReactDOM.render(<Root />, document.getElementById('root'));
