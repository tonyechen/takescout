import Welcome from './pages/Welcome';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup_user from './pages/Signup_user';
import Signup_restaurant from './pages/Signup_restaurant';
import About from './pages/About';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Welcome />} />
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
