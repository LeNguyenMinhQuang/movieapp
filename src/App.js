import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Home from "./components/Pages/Home";
import Catalog from "./components/Pages/Catalog";
import Detail from "./components/Pages/Detail";
import Search from "./components/Search/Search";

import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/:category" element={<Catalog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
