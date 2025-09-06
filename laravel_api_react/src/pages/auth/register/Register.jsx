import { useContext, useState } from "react";
import styles from './register.module.css';
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";

function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });
    const [errors, setErrors] = useState({});
    const {setToken} = useContext(AppContext);

    async function handleRegister(e) {
        e.preventDefault();
        const res = await fetch('/api/register', {
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
        <div className={styles.register}>
            <h1> Register a New Account </h1>
            <form className={styles.form} onSubmit={handleRegister}>
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={(e) => { setFormData({ ...formData, name: e.target.value }) }} >

                    </input>
                    {errors.name && <p className={styles.error}>{errors.name[0]}</p>}
                </div>
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
                <div>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.password_confirmation}
                        onChange={(e) => { setFormData({ ...formData, password_confirmation: e.target.value }) }} >

                    </input>
                </div>


                <button>
                    Register
                </button>
            </form>
        </div >
    );
}

export default Register;