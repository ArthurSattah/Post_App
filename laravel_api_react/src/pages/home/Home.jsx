import { useEffect, useState } from 'react';
import styles from './home.module.css'
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    async function getPosts() {
        const res = await fetch('/api/posts');
        const data = await res.json();
        if (res.ok)
            setPosts(data);
    }
    useEffect(() => {
        getPosts();
    }, [])
    return (
        <div className={styles.home}>
            <h2 className={styles.title}>
                Latest Post
            </h2>
            <div className={styles.posts}>
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div key={post.id} className={styles.post}>
                            <div className={styles.top_part}>
                                <h3>
                                    {post.title}
                                </h3>
                                <div>
                                    <Link to={`/posts/${post.id}`} className={styles.link} >Read more</Link>
                                </div>
                            </div>

                            <div className={styles.created_at}>
                                Crated by {post.user.name} on {" "}
                                {new Date(post.created_at).toLocaleTimeString()}
                            </div>
                            <div>
                                {post.body}
                            </div>
                        </div>
                    )))
                    :
                    (<p>Be the first one to make a post</p>)
                }
            </div>
        </div>
    );
}

export default Home;