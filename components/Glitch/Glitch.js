import React, { Component } from 'react';
var imagesLoaded = require('imagesloaded');

class Glitch extends Component {
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

export default Glitch;