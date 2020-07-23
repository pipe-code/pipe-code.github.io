import React, { useState, useEffect } from 'react';
import instagramWithCircle from '@iconify/icons-entypo-social/instagram-with-circle';
import spotifyIcon from '@iconify/icons-cib/spotify';
import SocialIcon from './SocialIcon';

const SocialIcons = (props) => {

    const [socialStatus, setSocialStatus] = useState({
        instagram: false,
        spotify: false
    });

    useEffect(() => {
        checkData("instagram", data => {
            if(data.status == "success") {
                setSocialStatus(prevState => {
                    return {...prevState, instagram: true};
                });
            }
        });
        checkData("spotify", data => {
            if(data.status == "success") {
                setSocialStatus(prevState => {
                    return {...prevState, spotify: true};
                });
            }
        });
    }, [])

    const checkData = (social, handleData) => {
        fetch(`https://pipelons-api-rest.herokuapp.com/${social}/`)
        .then(res => res.json())
        .then(response => {
            handleData(response);
        })
        .catch(err => {
            handleData({
                status: "error"
            });
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