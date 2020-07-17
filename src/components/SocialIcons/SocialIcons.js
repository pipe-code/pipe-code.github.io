import React, { useState } from 'react';
import instagramWithCircle from '@iconify/icons-entypo-social/instagram-with-circle';
import spotifyIcon from '@iconify/icons-cib/spotify';
import SocialIcon from './SocialIcon';

const SocialIcons = (props) => {

    const [socialStatus, setSocialStatus] = useState({
        instagram: false,
        spotify: false
    });

    const checkData = (social) => {
        fetch(`https://pipelons-api-rest.herokuapp.com/${social}/`)
        .then(res => res.json())
        .then(data => {
            if(data) return data;
            else return null;
        })
        .catch(err => {
            console.log(err);
        });
    }

    return (
        <div className="main-menu">
            <div className="menu-items">
                <SocialIcon icon={spotifyIcon} status={socialStatus.spotify} />
                <SocialIcon icon={instagramWithCircle} status={socialStatus.instagram} />
            </div>
        </div>
    );
};

export default SocialIcons;