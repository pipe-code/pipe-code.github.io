"use strict";

class Loader extends React.Component {
    render() {
        return(
            <div className="loader">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    }
}

class FullscreenBG extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "off",
            vimeoID: props.vimeoID,
            player: null,
            text: props.text
        };
        this.componentDidMount = this.componentDidMount.bind(this);
    }
    componentDidMount() {
        this.state.player = new Vimeo.Player( document.querySelector('.fullScreenVimeoBG iframe') );
        this.state.player.on('play', function() {
            document.querySelector(".container").classList.remove('loading');
            document.querySelector(".container").classList.add('imgloaded');
        });
    }
    render() {
        return (
            <div className={'fullScreenVimeoBG '+this.state.status}>
                <div className="aspect-ratio">
                    <iframe src={'https://player.vimeo.com/video/'+this.state.vimeoID+'?api=1?autoplay=1&loop=1&muted=1&title=0&byline=0&portrait=0&background=1#t=10s'}></iframe>
                </div>
                <div className="text">
                    <p>{this.state.text}</p>
                </div>
            </div>
        )
    }
}

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: props.url
        };
    }
    render() {
        return (
            <div className="logo">
                <img src={this.state.url} />
            </div>
        )
    }
}

export { Loader, FullscreenBG, Logo };