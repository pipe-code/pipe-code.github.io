import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux';
import fetchApiData from '../../fetchApiData';

import styles from './SinglePost.module.scss';

const SinglePost = (props) => {

    const [post, setPost] = useState( null );

    useEffect(() => {
        props.handleLoading( true );
        document.title = "PIPE:CODE";
        fetchApiData('posts/' + props.match.params.id, response => {
            if(response.status == "success" && response.data) {
                document.title = "PIPE:CODE | " + response.data.Title;
                setPost( response.data );
            }
            props.handleLoading( false );
        });
    }, []);

    return (
        <div className={styles.SinglePost}>
            { post ?
                <Aux>
                    <div>
                        <h1>{post.Title}</h1>
                    </div>
                    <div className={styles.Body} dangerouslySetInnerHTML={{__html: post.Body}} />
                </Aux>
                : <div>No se encontro post</div>
            }
        </div>
    )
}

export default SinglePost;