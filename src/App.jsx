import Head from "./components/header/header";
import './index.css';
import Home from "./components/home/home";
import Footer from "./components/footer/foot";
import { Route,Routes } from "react-router-dom";
import Placement from "./components/placement/placement";
import Alumini from "./components/alumini/alumini";
import Loginpage from "./components/login/login";
import Signupalu from "./components/login/signupal";
import AdminDash from "./components/admindash/admindash";
import AlumniDash from "./components/alumnidash/alumnidash";

const App=()=>{ 
    return(
    <>
        <Head/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alumini" element={<Alumini />} />
            <Route path="/" element={<Home />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/loginpage" element={<Loginpage />} />
            <Route path="/loginpage/signup" element={<Signupalu />} />
            <Route path="/aluminiDash" element={<AlumniDash />} />
            <Route path="/adminDash" element={<AdminDash />} />
        </Routes>
        <Footer />
    </>
    )
}

export default App;