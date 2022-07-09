import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import Navbar from "./Components/shared/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <ToastContainer />

        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
