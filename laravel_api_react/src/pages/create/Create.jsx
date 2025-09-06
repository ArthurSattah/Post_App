import { useContext, useState } from 'react';
import styles from './create.module.css'
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
function Create() {

    const {token }= useContext(AppContext);
    const [formData, setFormData] = useState({
        title: "",
        body: ""
    })
    const [errors , setErrors] = useState({});
    const navigate = useNavigate();

    async function handleCreate(e) {
        e.preventDefault();
        const res = await fetch('/api/posts', {
            method: "post",
            body: JSON.stringify(formData),
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        
        const data = await res.json();
        if (data.errors)
            setErrors(data.errors);
        else {
            navigate('/');
        }
    }
    return (
        <div className={styles.create}>
            <h1 className={styles.title}>
                Create New Post
            </h1>
            <form onSubmit={handleCreate} className={styles.form}>
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
                <button> Create</button>
            </form>
        </div>

    );
}

export default Create;