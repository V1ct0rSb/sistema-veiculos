import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ClienteInfo.css";
import emailjs from "emailjs-com";

const ClienteInfo = () => {
  const [cadastros, setCadastros] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cadastros");
        console.log(response.data); // Verifique os dados no console
        setCadastros(response.data || []); // Trate o caso em que response.data é undefined
      } catch (error) {
        console.error("Erro ao buscar dados do servidor:", error);
      }
    };

    fetchData();
  }, []);

  const toggleDropdown = (clientId) => {
    setSelectedClientId((prevSelectedClientId) =>
      prevSelectedClientId === clientId ? null : clientId
    );
  };

  const sendEmail = (email) => {
    emailjs
      .send("emailService", "templateId", "templateParams", "publicKey")
      .then(
        (response) => {
          console.log(
            "E-mail de trabalho concluido enviado com sucesso!",
            response
          );
        },
        (error) => {
          console.error("Erro ao enviar oE-mail de trabalho!:", error);
        }
      );
  };

  return (
    <div className="cliente-info-container">
      <h1 className="cliente-info-title">Informações do Cliente</h1>
      <ul className="cliente-group-title">
        {cadastros.map((cadastro) => (
          <li key={cadastro.id} className="cliente-item">
            <div
              className="cliente-dropdown-title"
              onClick={() => toggleDropdown(cadastro.id)}
            >
              <h3>Cliente: {cadastro.id}</h3>
            </div>

            {selectedClientId === cadastro.id && (
              <div className="cliente-cadastro-list">
                <h3>Dados do Veículo:</h3>
                <p>Placa: {cadastro.placa}</p>
                <span>
                  <p>Modelo: {cadastro.modelo}</p>
                </span>

                <h3>Pecas:</h3>
                <ul className="cliente-peca-list">
                  {cadastro.pecas.map((peca) => (
                    <li key={peca.id}>
                      <p>Nome: {peca.nome}</p>
                      <p>Número de Série: {peca.numeroSerie}</p>
                      <p>Descrição: {peca.descricao}</p>
                    </li>
                  ))}
                </ul>

                <h3>Dados de Revisão:</h3>
                <p>Data de Revisão: {cadastro.dadosRevisao?.dataRevisao}</p>

                <h3>Dados do Proprietário:</h3>
                {cadastro.dadosProprietarios.map((proprietario) => (
                  <div key={proprietario.id} className="cliente-proprietario">
                    <p>Nome: {proprietario.nome}</p>
                    <p>Endereço: {proprietario.endereco}</p>
                    <p>Email: {proprietario.email}</p>
                    <p>Telefone: {proprietario.telefone}</p>

                    <button onClick={() => sendEmail(proprietario.email)}>
                      Enviar Email
                    </button>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClienteInfo;
