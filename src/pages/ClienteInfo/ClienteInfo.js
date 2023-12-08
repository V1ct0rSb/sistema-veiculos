import React, { useState, useEffect } from "react";
//Importando o axios
import axios from "axios";
import emailjs from "emailjs-com";
// Importando os ícones
import { IoIosSend } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
// Importando o CSS
import "./ClienteInfo.css";

const ClienteInfo = () => {
  // Criando os estados para os dados do formulário
  const [cadastros, setCadastros] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  // Controlando os eventos para atualizar os estados conforme o usuário preenche o formulário
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/cadastros");
        console.log("Sucesso ao buscar dados do servidor:", response.data);
        setCadastros(response.data || []);
      } catch (error) {
        console.error("Erro ao buscar dados do servidor:", error);
      }
    };

    fetchData();
  }, []);

  // Função para alternar o estado do dropdown
  const toggleDropdown = (clientId) => {
    setSelectedClientId((prevSelectedClientId) =>
      prevSelectedClientId === clientId ? null : clientId
    );
  };

  // Enviar e-mail de confirmação de revisão
  const sendEmail = (proprietario) => {
    const templateParams = {
      from_name: "Sistema de Gerenciamento de Veículos e Manutenção",
      to_name: proprietario.nome,
      email: proprietario.email,
    };

    emailjs
      .send(
        "service_37ayrue",
        "template_sq7ibzm",
        templateParams,
        "1ycY8C-XgGXmq8Vg8"
      )
      .then(
        (response) => {
          console.log(
            "E-mail de Confirmação de Revisão enviado com sucesso:",
            response
          );
        },
        (error) => {
          console.error(
            "Erro ao enviar o E-mail de Confirmação de Revisão: ",
            error
          );
        }
      );
  };

  // Marcar o trabalho como concluído
  const handleTrabalhoConcluido = async () => {
    try {
      await axios.put(
        `http://localhost:3001/cadastros/${selectedClientId}/concluir`
      );
      setCadastros((prevCadastros) =>
        prevCadastros.map((cadastro) =>
          cadastro.id === selectedClientId
            ? { ...cadastro, status: "Concluido" }
            : cadastro
        )
      );
    } catch (error) {
      console.error("Erro ao marcar o trabalho como concluído:", error);
    }
  };

  return (
    <div className="cliente-info-container">
      <h1 className="cliente-info-title">Informações do Cliente</h1>

      <ul className="cliente-group-title">
        {cadastros.length === 0 ? (
          <p className="empty">Nenhum cliente cadastrado no momento.</p>
        ) : (
          cadastros.map((cadastro) => (
            <li key={cadastro.id} className="cliente-item">
              <div
                className="cliente-dropdown-title"
                onClick={() => toggleDropdown(cadastro.id)}
              >
                <div className="title-group">
                  <h3>Cliente: {cadastro.id}</h3>
                  <h3
                    className={`status ${
                      cadastro.status === "pendente"
                        ? "text-yellow"
                        : "text-green"
                    }`}
                  >
                    {cadastro.status}
                  </h3>
                </div>
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

                      <div className="group">
                        <button
                          className="btn-send"
                          onClick={() => sendEmail(proprietario)}
                        >
                          <IoIosSend />
                          Enviar Email
                        </button>

                        <div className="status">
                          {!cadastro.status ||
                          cadastro.status === "pendente" ? (
                            <button
                              className="btn-trabalho-concluido"
                              onClick={handleTrabalhoConcluido}
                            >
                              <FaCheck />
                              Trabalho Concluído
                            </button>
                          ) : (
                            <p>Status: {cadastro.status}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ClienteInfo;
