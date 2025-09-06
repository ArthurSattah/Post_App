import { useContext, useEffect, useState } from 'react';
import styles from './update.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
function Update() {

    const { id } = useParams();
    const { token, user } = useContext(AppContext);
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })

    async function getPost() {
        const res = await fetch(`/api/posts/${id}`);
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            if (user.id !== data.user.id)
                navigate("/");
            setFormData({ title: data.post.title, body: data.post.body });
        }
    }

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    async function handleUpdate(e) {
        e.preventDefault();
        const res = await fetch(`/api/posts/${id}`, {
            method: "put",
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        console.log(data);

        if (data.errors)
            setErrors(data.errors);
        else {
            navigate('/');
        }
    }


    useEffect(() => {
        getPost();
    }, [])

    return (
        <div className={styles.update}>
            <h1 className={styles.title}>
                Update The Post
            </h1>
            <form onSubmit={handleUpdate} className={styles.form}>
                <div>
                    <input type="text" placeholder='Post Title'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
                    {errors.title && <p className={styles.error}>{errors.title[0]}</p>}
                </div>
                <div>
                    <textarea rows="6" placeholder='Post Content'
                        value={formData.body}
                        onChange={(e) => setFormData({ ...formData, body: e.target.value })} />

                    {errors.body && <p className={styles.error}>{errors.body[0]}</p>}
                </div>
                <button> Update</button>
            </form>
        </div>

    );
}

export default Update;