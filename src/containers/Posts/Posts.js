import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from '../../axiosInstance';

import styles from './Posts.module.scss';

const Posts = (props) => {

    const [posts, setPosts] = useState(null);
    
    useEffect(() => {
        console.log(process.env);
        document.title = props.title;
        props.handleLoading( true );
        axios.get('posts').then(response => {
            if(response.status === 200 && response.data.length > 0) setPosts( response.data );
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
        <div className={styles.Posts}>
            {
                posts ?
                    posts.map(item => {
                        return (
                            <Link to={'/posts/' + item._id} key={item._id} className={styles.Link}>
                                <span>[{getFormattedDate(item.createdAt)}]</span> {item.Title}
                            </Link>
                        )
                    })
                : <p>Aun no hay posts disponibles... que pena pues mk, pero pase despues.</p>
            }
        </div>
    )
}

export default Posts;