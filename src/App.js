import { BrowserRouter, Route, Routes} from "react-router-dom";
import { UserProvider } from "./contexts/userContext";
import Home from "./pages/homePage";
import Login from "./pages/loginPage";
import PrivateRoute from "./pages/privateRoutePage";
import Signup from "./pages/signupPage";
import AddNew from "./pages/addNew";
import UserAppointments from "./pages/userAppointments";
import EditAppointment from "./pages/editAppointment";
import Navbar from "./components/Navbar";
 
function App() {
 return (
   <BrowserRouter>
     {/* We are wrapping our whole app with UserProvider so that */}
     {/* our user is accessible through out the app from any page*/}
     <UserProvider>
     <Navbar />
       <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signupPage" element={<Signup />} />
          {/* We are protecting our Home Page from unauthenticated */}
          {/* users by wrapping it with PrivateRoute here. */}
          <Route element={<PrivateRoute />}>
            <Route exact path="/" element={<Home />} />
            <Route path='/homePage' exact element={<Home />} />
            <Route path='/addNew' element={<AddNew />} />
            <Route path='/userAppointments' element={<UserAppointments /> } />
            <Route path='/editAppointment' element={ <EditAppointment /> } />
          </Route>
       </Routes>
     </UserProvider>
   </BrowserRouter>
 );
}
 
export default App;