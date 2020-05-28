import React, { Component } from 'react';
import { Icon, InlineIcon } from '@iconify/react';
import instagramWithCircle from '@iconify/icons-entypo-social/instagram-with-circle';
import spotifyIcon from '@iconify/icons-cib/spotify';

class Menu extends Component {
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
                        <div className="icon">
                            <Icon icon={spotifyIcon} />
                        </div>
                        <div className="status-indicator">
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                    <div className={'instagram '+this.state.instagram.status} onClick={() => this.testClick()}>
                        <div className="icon">
                            <Icon icon={instagramWithCircle} />
                        </div>
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

export default Menu;