import React, { useState, useEffect } from 'react';
import axios from '../../axiosInstance';
import CommentItem from './Comment';
import { Icon } from '@iconify/react';
import sendIcon from '@iconify/icons-mdi/send';
import FormLoader from '../FormLoader/FormLoader';
import openSocket from 'socket.io-client';

import styles from './Comments.module.scss';

const Comments = (props) => {

    const [fakeIdentity, setFakeIdentity] = useState( null );
    const [comment, setComment] = useState( '' );
    const [comments, setComments] = useState( null );
    const [sending, setSending] = useState( false );

    // const socket = openSocket('http://localhost:1337');
    const socket = openSocket('https://pipe-code-api.herokuapp.com');

    useEffect(() => {
        getComments();
        setFakeIdentityHandler();
        socket.on("someone_commented", response => {
            if(response === props.postID) getComments();
        });
    }, []);

    const getComments = () => {
        axios.get('comments?Post='+props.postID).then(response => {
            if(response.status === 200) {
                setComments(response.data);
            }
        }).catch(error => {
            console.log(error);
        });
    }

    const setFakeIdentityHandler = () => {
        const fakeIdentityStoraged = localStorage.getItem('myFakeIdentity');
        if(fakeIdentityStoraged) {
            setFakeIdentity(JSON.parse(fakeIdentityStoraged));
        } else {
            fetch('https://randomuser.me/api')
                .then(res => res.json())
                .then(response => {
                    const identity = {
                        name: response.results[0].name.first + ' ' + response.results[0].name.last,
                        pic: response.results[0].picture.thumbnail
                    }
                    localStorage.setItem('myFakeIdentity', JSON.stringify(identity));
                    setFakeIdentity(identity);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }

    const sendCommentHandler = (event) => {
        event.preventDefault();
        event.persist();
        let myComment = {
            "Name": fakeIdentity.name,
            "Thumbnail": fakeIdentity.pic,
            "Post": props.postID,
            "Comment": comment
        }
        if(comment != '') {
            setSending( true );
            axios.post('comments', myComment).then(response => {
                if(response.status === 201) {
                    setComment('');
                    setSending( false );
                }
            }).catch(error => {
                console.log(error);
            });
        }
    }

    const commentHandler = (event) => {
        event.persist();
        setComment(event.target.value);
    }

    return (
        <div className={styles.Comments}>
            <h2>Si te gusto o no, dejame tu feedback!</h2>
            <small>Tu comentario sera completamente anonimo y me motiva a seguir escribiendo pendejadas útiles.</small>
            { comments ?
                comments.map(item => {
                    return <CommentItem key={item._id} commentData={item} />;
                })
            : null}
            {sending ? <FormLoader /> : null}
            <form onSubmit={sendCommentHandler}>
                <input type="text" onChange={commentHandler} value={comment} />
                <button type="submit" disabled={sending}><Icon icon={sendIcon} /></button>
            </form>
        </div>
    )
}

export default Comments;