"use strict";

import { Loader, FullscreenBG, Logo } from './luchomotos/components';

const Root = (props) => {
    return (
        <div className="container loading">
            <Loader />
            <Logo url="./luchomotos/images/logo.png" />
            <FullscreenBG vimeoID="59403272" text="Busqué mi libertad en todas partes, y la encontré justo aquí arriba de mi motocicleta. Solo tengo que subirme y emprender un viaje..." />
        </div>
    )
};
 
ReactDOM.render(<Root />, document.getElementById('root'));
