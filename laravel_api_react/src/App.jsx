import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import styles from './app.module.css'
import Layout from './pages/layout/Layout';
import Home from './pages/home/Home';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import { useContext } from 'react';
import { AppContext } from './context/AppContext';
import Create from './pages/create/Create';
import Post from './pages/post/Post';
import Update from './pages/update/Update';

function App() {
    const { user } = useContext(AppContext);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="/register" element={user ? <Home /> : <Register />} />
                    <Route path="/login" element={user ? <Home /> : <Login />} />
                    <Route path="/create" element={user ? <Create /> : <Login />} />
                    <Route path="/posts/:id" element={user ? <Post /> : <Login />} />
                    <Route path="/posts/update/:id" element={user ? <Update /> : <Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;