import React from "react";
// CSS global para o projeto
import "./styles/globalStyle.css";
// React-Router-Dom vai ser usado para criar as rotas
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// Importando as página
import CadastroVeiculos from "./pages/CadastroVeiculos/CadastroVeiculos";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CadastroVeiculos />} />
      </Routes>
    </Router>
  );
}
