import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";

import Homepage from "./pages/Homepage";
import DailyPage from "./pages/DailyPage";
import RoverPicPage from "./pages/RoverPicPage";
import Sidebar from "./components/Sidebar/Sidebar";
import LoginForm from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <div
      style={{ backgroundColor: "#060814", color: "#D8DCF4" }}
      className="flex h-full font-poppins"
    >
      <header className="App-header"></header>
      <BrowserRouter>
        <div className="container mx-auto flex flex-1">
          <div className="sidebar-container w-64">
            <Sidebar />
          </div>
          <div className="content-container flex-1 ml-4">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<Register />} />
              {/* <Route element={<AuthOutlet fallbackPath="/login" />}> */}
                <Route path="/daily" element={<DailyPage />} />
                <Route path="/rover" element={<RoverPicPage />} />
              {/* </Route> */}
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
