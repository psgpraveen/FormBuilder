import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

const Sharelink = lazy(() => import("./components/Sharelink/Index"));
const Login = lazy(() => import("./components/login/index"));
const Home = lazy(() => import("./components/home/index"));
const Lob = lazy(() => import("./components/Lob/index"));
const SignUp = lazy(() => import("./components/SignUp/Index"));
const Responses = lazy(() => import("./components/Response/index"));
const Footer = lazy(() => import("./components/Footer/index"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/lob" element={<Lob />} />
          <Route path="/lob/:email/:id/" element={<Sharelink />} />
          <Route path="/response/:name" element={<Responses />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer/>
      </Suspense>
    </Router>
  );
}

export default App;
