import Head from "./components/header/header";
import './index.css';
import Home from "./components/home/home";
import Footer from "./components/footer/foot";
import { Route,Routes } from "react-router-dom";
import Placement from "./components/placement/placement";
import Alumini from "./components/alumini/alumini";
const App=()=>{
    return(
    <>
        <Head />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alumini" element={<Alumini />} />
            <Route path="/" element={<Home />} />
            <Route path="/placement" element={<Placement />} />
        </Routes>
        
        <Footer />
    </>
    )
}

export default App;