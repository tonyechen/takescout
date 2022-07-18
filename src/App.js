import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';
import Signup_user from './pages/Signup_user';
import Signup_restaurant from './pages/Signup_restaurant';
import About from './pages/About';
import Login from './pages/Login';
import User_home from './pages/User_home';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useRecoilState } from 'recoil';
import { authState } from './atom/auth';

function App() {
    const [authentication, setAuth] = useRecoilState(authState);

    onAuthStateChanged(auth, (user) => {
        console.log('user status changed: ', user);
        if (user) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    });

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={authentication ? <User_home /> : <Welcome />}
                />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup">
                    <Route path="" element />
                    <Route path="user" element={<Signup_user />} />
                    <Route path="restaurant" element={<Signup_restaurant />} />
                </Route>
                <Route path="*" />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
