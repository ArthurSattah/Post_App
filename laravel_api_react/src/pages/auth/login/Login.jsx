import { useContext, useState } from "react";
import styles from './login.module.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const {setToken} = useContext(AppContext);

    async function handleLogin(e) {
        e.preventDefault();
        const res = await fetch('/api/login', {
            method: "post",
            body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (data.errors)
            setErrors(data.errors);
        else {
            localStorage.setItem('token', data.token)
            setToken(data.token);
            navigate('/');
        }
    }
    return (
        <div className={styles.login}>
            <h1> Login To Your Account </h1>
            <form className={styles.form} onSubmit={handleLogin}>
                
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => { setFormData({ ...formData, email: e.target.value }) }} >
                    </input>

                    {errors.email && <p className={styles.error}>{errors.email[0]}</p>}
                </div>
                <div>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => { setFormData({ ...formData, password: e.target.value }) }} >

                    </input>

                    {errors.password && <p className={styles.error}>{errors.password[0]}</p>}
                </div>

                <button >
                    Login
                </button>
            </form>
        </div >
    );
}

export default Login;