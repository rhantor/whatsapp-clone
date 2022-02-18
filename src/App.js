import SignUp from "./Components/pages/Signup";
import ChatRoom from "./Components/pages/ChatRoom";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./Contexts/AuthContext";
import "./css/global.css";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";
import Profile from "./Components/Profile";
function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/signup" />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/chatroom" element={<ChatRoom />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/" element={<PublicRoute />}>
            <Route path="/signup" element={<SignUp />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
