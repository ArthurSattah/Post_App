import { Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import styles from './layout.module.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
function Layout() {
    const { user, setUser, token, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    async function handleLogout(e) {
        e.preventDefault();
        const res = await fetch('/api/logout', {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();
        if (res.ok) {
            setUser(null);
            setToken(null);
            localStorage.removeItem('token');
            navigate("/")
        }
    }
    return (
        <>
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link className={styles.link} to="/"> Home </Link>
                    {user ?
                        <div className={styles.right}>
                            <div>Wellcome back {user.name} </div>

                            <Link className={styles.link} to="/create"> New Post </Link>
                            <form onSubmit={handleLogout}>
                                <button>Logout</button>
                            </form>
                        </div>
                        :
                        <div>
                            <Link className={styles.link} to="/register"> Register </Link>
                            <Link className={styles.link} to="/login" > Login </Link>
                        </div>
                    }
                </nav>
            </header>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    );
}

export default Layout;