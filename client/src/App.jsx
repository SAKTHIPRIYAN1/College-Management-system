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
import AdminDet from "./components/admindash/admindetail";
import AdminLog from "./components/admindash/adminlog";
import AdminNewuser from "./components/admindash/adminNewuser";
import News from "./components/admindash/adminNews";
import Cuic from "./components/admindash/admincuic";
import Adminevents from "./components/admindash/adminEvents";
import AdminChangePass from "./components/admindash/adminChangePass";
import Alumedit from "./components/alumnidash/alumedit";
import Alumdet from "./components/alumnidash/alumdet";
import Alumchanpass from "./components/alumnidash/alumchangpass";
import Alumevent from "./components/alumnidash/alumevent";


import { AuthProvider } from "./auth";

export const SERVER_URL='http://localhost:3000';

const App=()=>{ 
    // console.log(process.env.SERVER_URL +"HIII");
    return(
      <AuthProvider>
        <Head/>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/alumni" element={<Alumini />} />
            <Route path="/" element={<Home />} />
            <Route path="/placement" element={<Placement />} />
            <Route path="/loginpage/admin" element={<Loginpage page='Admin' />} />
            <Route path="/loginpage" element={<Loginpage page='Admin' />} />
            <Route path="/loginpage/alumini" element={<Loginpage page='Alumni' />} />
            <Route path="/loginpage/signup" element={<Signupalu />} />
          

          {/* nested route for aluminiii Dash... */}
            <Route path="/aluminiDash" element={<AlumniDash />} >
                <Route index element={<Alumdet />} />
                <Route path="edit" element={<Alumedit/>} />
                <Route path="events" element={<Alumevent />} />
                <Route path="changepassword" element={<Alumchanpass />} />
            </Route>


              {/* nexted route for adminDash....*/}
            <Route path="/adminDash" element={<AdminDash />}>
                         <Route index element={<AdminDet />} />
                        <Route path="news" element={<News />} />
                        <Route path="events" element={<Adminevents />} />
                        <Route path="cuic" element={<Cuic />} />
                        <Route path="new-user" element={<AdminNewuser />} />
                        <Route path="changepassword" element={<AdminChangePass />} />
                        <Route path="logs" element={<AdminLog />} />
                </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    )
}

export default App;