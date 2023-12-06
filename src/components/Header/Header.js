import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <header>
      <h1>VB</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">Cadastro de Veículos</Link>
          </li>
          <li>
            <Link to="/info">Informações do Cliente</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
