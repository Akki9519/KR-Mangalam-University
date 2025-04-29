import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";

import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Dashboard from "./component/Dashboard";


const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
};


export default App;