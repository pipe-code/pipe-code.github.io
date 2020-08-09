import React, {useState, useEffect} from 'react';
import fetchApiData from '../../fetchApiData';

import styles from './Posts.module.scss';

const Posts = (props) => {

    const [posts, setPosts] = useState(null);
    
    useEffect(() => {
        props.handleLoading( true );
        fetchApiData('posts', response => {
            console.log(response);
            if(response.status == "success" && response.data.length > 0) setPosts( response.data );
            props.handleLoading( false );
        });
    }, []);

    return (
        <div className={styles.Posts}>
            {
                posts ?
                    posts.map(item => {
                        return (
                            <a key={item._id}>{item.Title}</a>
                        )
                    })
                : <p>Aun no hay posts disponibles... que pena pues mk, pero pase despues.</p>
            }
        </div>
    )
}

export default Posts;