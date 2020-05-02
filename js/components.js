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

class Logo extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            title: "[PIPE:CODE]",
            toggleTitleStatus: true
        };

        this.toggleTitle = this.toggleTitle.bind(this);
    }

    toggleTitle() {
        this.setState(state => ({
            toggleTitleStatus: !state.toggleTitleStatus
        }));
        console.log(this.state.toggleTitleStatus);
        // if(this.state.toggleTitleStatus){
        //     this.setState(state => ({
        //         title: "[PIPE:CODE]"
        //     }));
        // } else {
        //     this.setState(state => ({
        //         title: "[PIPELONCHO:WEB]"
        //     }));
        // }
    }

    render() {
        return (
            <div className="logo" onClick={this.toggleTitle}>
                <h1>{this.state.title}</h1>
            </div>
        ) 
    }
}

class Glitch extends React.Component {
    constructor(props) {
        super(props);
        this.style = {
            backgroundImage: 'url(' + props.image + ')'
        };
    }
    componentDidMount() {
        imagesLoaded('.glitch-img', { background: true }, () => {
            document.querySelector(".container").classList.remove('loading');
            document.querySelector(".container").classList.add('imgloaded');
        });
    }
    render() {
        return (
            <div className="full-screen-glitch loading">
                <div className="content">
                    <div className="glitch">
                        <div className="glitch-img" style={this.style}></div>
                        <div className="glitch-img" style={this.style}></div>
                        <div className="glitch-img" style={this.style}></div>
                        <div className="glitch-img" style={this.style}></div>
                        <div className="glitch-img" style={this.style}></div>
                    </div>
                </div>
            </div>
        );
    }
};

class Menu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleMenuStatus: true,
            spotify: {
                status: "off",
                infoBubble: "off"
            },
            instagram: {
                status: "off",
                infoBubble: "off"
            }
        };

        this.checkSpotify = this.checkSpotify.bind(this);
    }
    checkSpotify() {
        fetch('https://pipelons-api-rest.herokuapp.com/spotify/')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(!data.error) {
                this.setState(state => ({
                    spotify:{status: "on"}
                }));
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    checkInstagram() {
        fetch('https://pipelons-api-rest.herokuapp.com/instagram/')
        .then(res => res.json())
        .then(data => {
            // console.log(data);
            if(data) {
                this.setState(state => ({
                    instagram:{status: "on"}
                }));
            }
        })
        .catch(err => {
            console.log(err);
        });
    }
    testClick() {
        console.log('this is:', this);
    }
    componentDidMount() {
        this.checkSpotify();
        this.checkInstagram();
    }
    
    render() {
        return (
            <div className="main-menu">
                <div className="menu-toggler">

                </div>
                <div className="menu-items">
                    <div className={'spotify '+this.state.spotify.status}>
                        <i className="typcn typcn-notes-outline"></i>
                        <div className="status-indicator">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={'instagram '+this.state.instagram.status} onClick={() => this.testClick()}>
                        <i className="typcn typcn-social-instagram-circular"></i>
                        <div className="status-indicator">
                            <div></div>
                            <div></div>
                        </div>
                        {this.state.instagram.status == "on" &&
                            <div className="info">

                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
};


export { Loader, Glitch, Logo, Menu };