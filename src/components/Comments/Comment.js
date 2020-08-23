import React from 'react';

import styles from './Comment.module.scss';

const Comment = (props) => {
    return (
        <div className={styles.Comment}>
            <div className={styles.Content}>
                <div className={styles.Pic}>
                    <img src={props.commentData.Thumbnail} />
                </div>
                <div className={styles.Text}>
                    <small>{props.commentData.Name}</small>
                    <p>{props.commentData.Comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;