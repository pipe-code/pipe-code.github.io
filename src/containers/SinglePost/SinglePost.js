import React, { useState, useEffect } from 'react';
import Aux from '../../hoc/Aux';
import Comments from '../../components/Comments/Comments';
import axios from '../../axiosInstance';

import styles from './SinglePost.module.scss';

const SinglePost = (props) => {

    const [post, setPost] = useState( null );

    useEffect(() => {
        props.handleLoading( true );
        document.title = "PIPE:CODE";
        axios.get('posts/' + props.match.params.id).then(response => {
            if(response.status === 200 && response.data) {
                document.title = "PIPE:CODE | " + response.data.Title;
                setPost( response.data );
            }
            props.handleLoading( false );
        }).catch(error => {
            console.log(error);
        });
    }, []);

    const getFormattedDate = (date) => {
        let formattedDate = new Date(Date.parse(date));
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear();
    }

    return (
        <div className={styles.SinglePost}>
            { post ?
                <Aux>
                    <div>
                        <h1>{post.Title}</h1>
                    </div>
                    <div className={styles.Body} dangerouslySetInnerHTML={{__html: post.Body}} />
                    <div className={styles.PostDate}>Fecha de publicación: {getFormattedDate(post.createdAt)}</div>
                    <Comments postID={post._id} />
                </Aux>
                : <div>No se encontro post</div>
            }
        </div>
    )
}

export default SinglePost;