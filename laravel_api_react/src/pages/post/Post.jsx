import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styles from './post.module.css'
import { AppContext } from "../../context/AppContext";
function Post() {
    const { id } = useParams();
    const { user, token } = useContext(AppContext);
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        if (res.ok)
            setPost(data.post);
    }
    async function handleDelete(e) {
        e.preventDefault();
        if (user && user.id === post.user_id) {
            const res = await fetch(`/api/posts/${id}`, {
                method: "delete",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            
            const data = await res.json();
            if (res.ok) {
                navigate("/");
            }
        }
    }
    useEffect(() => {
        getPost();
    }, [])

    return (
        <div className={styles.posts}>
            {post ? (

                <div key={post.id} className={styles.post}>
                    <h3 >

                        {post.title}
                    </h3>

                    <div className={styles.created_at}>
                        Crated by {post.user.name} on {" "}
                        {new Date(post.created_at).toLocaleTimeString()}
                    </div>
                    <div>
                        {post.body}
                    </div>
                    <div className={styles.update_del}>

                        {
                            user && user.id === post.user_id &&
                            <Link to={`/posts/update/${post.id}`} className={styles.update}>
                                Update
                            </Link>
                        }
                        {
                            user && user.id === post.user_id &&
                            <form onSubmit={handleDelete} >
                                <button className={styles.delete}>
                                    Delete
                                </button>
                            </form>
                        }
                    </div>

                </div>
            )
                :
                (<h2 className={styles.notFound}>Post Not Found</h2>)
            }
        </div>
    );
}

export default Post;