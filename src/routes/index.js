// routes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import SignIn from "../LoginRegister/SignIn";

import KayitOl from "../LoginRegister/KayitOl";

import Takvim from "../Card/Takvim";
import Cizelge from "../Card/Cizelge";
import HomePage from "../Giris/HomePage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/giris" element={<HomePage />} />
      <Route path="/kayitol" element={<KayitOl />} />
      <Route path="/takvim" element={<Takvim />}></Route>
      <Route path="/cizelge" element={<Cizelge />}></Route>
    </Routes>
  );
}

export default AppRouter;
