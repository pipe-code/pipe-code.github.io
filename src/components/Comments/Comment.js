import React from 'react';

import styles from './Comment.module.scss';

const Comment = (props) => {

    const getFormattedDate = (date) => {
        let formattedDate = new Date(Date.parse(date));
        return formattedDate.getDate() + '/' + (formattedDate.getMonth() + 1) + '/' + formattedDate.getFullYear() + '-' + formattedDate.getHours() + ':' + formattedDate.getMinutes();
    }

    return (
        <div className={styles.Comment}>
            <div className={styles.Content}>
                <div className={styles.Pic}>
                    <img src={props.commentData.Thumbnail} />
                </div>
                <div className={styles.Text}>
                    <small>{props.commentData.Name} [{getFormattedDate(props.commentData.createdAt)}]</small>
                    <p>{props.commentData.Comment}</p>
                </div>
            </div>
        </div>
    )
}

export default Comment;