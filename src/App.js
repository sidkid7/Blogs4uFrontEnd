import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "reactstrap";
import Base from "./components/Base";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import Services from "./pages/Services";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Userdashboard from "./pages/user-routes/Userdashboard";
import Privateroute from "./components/Privateroute";
import ProfileInfo from "./pages/user-routes/ProfileInfo";
import PostPage from "./pages/PostPage";
import UserProvider from "./context/UserProvider";
import Science from "./pages/CategoryPages/Science";
import Technology from "./pages/CategoryPages/Technology";
import PersonalBlogs from "./pages/CategoryPages/PersonalBlogs";
import Educational from "./pages/CategoryPages/Educational";
import Financial from "./pages/CategoryPages/Financial";
import Travel from "./pages/CategoryPages/Travel";
import Health from "./pages/CategoryPages/Health";
import Food from "./pages/CategoryPages/Food";
import Sports from "./pages/CategoryPages/Sports";

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <ToastContainer position="bottom-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/science" element={<Science />} />
        <Route path="/technology" element={<Technology />} />
        <Route path="/personalblogs" element={<PersonalBlogs />} />
        <Route path="/educational" element={<Educational />} />
        <Route path="/financial" element={<Financial />} />
        <Route path="/travel" element={<Travel />} />
        <Route path="/health" element={<Health />} />
        <Route path="/food" element={<Food />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/posts/:postId" element={<PostPage />} />

        <Route path="/user" element={<Privateroute />}>
          <Route path="dashboard" element={<Userdashboard />} />
          <Route path="profile-info" element={<ProfileInfo />} />
        </Route>


      </Routes>
    </BrowserRouter>
    </UserProvider> 
  );
}

export default App;
