import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Welcome from './pages/Welcome';
import Navbar from './components/Navbar';
import Signup_user from './pages/Signup_user';
import Signup_restaurant from './pages/Signup_restaurant';
import About from './pages/About';
import Login from './pages/Login';
import User_home from './pages/User_home';
import Restaurant_home from './pages/Restaurant_home';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authState } from './atom/auth';
import { userInfo, userTypeState, userUID } from './atom/userInfo';
import Restaurant_profile from './pages/Restaurant_profile';
import useUserInfos from './hooks/useUserInfos';

function App() {
    const [authentication, setAuth] = useRecoilState(authState);
    const [userType, setUserType] = useRecoilState(userTypeState);
    const [userID, setUserId] = useRecoilState(userUID);

    // automatically fetch and update user Info
    useUserInfos();

    // handle auth changes and keep track of global state for user_type and uid
    onAuthStateChanged(auth, (user) => {
        if (user) {
            setAuth(true);
            setUserType(window.localStorage.getItem('user_type'));
            setUserId(window.localStorage.getItem('uid'));
        } else {
            setAuth(false);
            window.localStorage.removeItem('user_type');
            window.localStorage.removeItem('uid');
        }
    });

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/"
                    element={
                        authentication ? (
                            userType == 'user' ? (
                                <User_home />
                            ) : (
                                <Restaurant_home />
                            )
                        ) : (
                            <Welcome />
                        )
                    }
                />
                <Route path="/about" element={<About />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup">
                    <Route path="user" element={<Signup_user />} />
                    <Route path="restaurant" element={<Signup_restaurant />} />
                </Route>

                {/* Only route to these paths when user are authenticated */}
                {authentication && (
                    <>
                        <Route
                            path="/profile/user/:id"
                            element={<Restaurant_profile />}
                        />

                        <Route
                            path="/restaurant/:id"
                            element={<Restaurant_profile />}
                        />
                    </>
                )}
                <Route
                    path="*"
                    element={<div>404. this page does not exist</div>}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
