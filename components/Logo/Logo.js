import React, { Component } from 'react';

class Logo extends Component{
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

export default Logo;