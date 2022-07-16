import Welcome from './pages/Welcome';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup_user from './pages/Signup_user';
import Signup_restaurant from './pages/Signup_restaurant';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/" element={<Welcome />} />
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
