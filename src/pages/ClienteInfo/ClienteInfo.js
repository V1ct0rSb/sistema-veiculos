// ClienteInfo.js
import { FaChevronDown } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com"; // Importe a biblioteca emailjs-com
import "./ClienteInfo.css";

function ClienteInfo() {
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    // Recupera os dados do localStorage
    const storedCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    setCadastros(storedCadastros);
  }, []);

  const [expandedItems, setExpandedItems] = useState({});

  const handleDropdownToggle = (index) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [index]: !prevExpandedItems[index],
    }));
  };

  const handleDeleteCadastro = (index) => {
    // Remove o cadastro do localStorage
    const updatedCadastros = [...cadastros];
    updatedCadastros.splice(index, 1);
    localStorage.setItem("cadastros", JSON.stringify(updatedCadastros));
    setCadastros(updatedCadastros);
  };

  // Função para enviar e-mail de notificação
  const handleEnviarEmail = (index) => {
    const cadastro = cadastros[index];

    // Configuração do serviço de e-mail e template
    const emailService = "seu_servico_de_email"; // Substitua pelo seu serviço de e-mail
    const templateId = "seu_template_de_email"; // Substitua pelo ID do seu template de e-mail
    const publicKey = "sua_chave_publica"; // Substitua pela sua Public Key

    // Configuração dos parâmetros do template
    const templateParams = {
      to_name: cadastro.dadosProprietario.nome,
      message:
        "Seu carro está pronto para retirada. Entre em contato conosco para agendar a retirada. Obrigado!",
      email: cadastro.dadosProprietario.email,
    };

    // Envio do e-mail
    emailjs.send(emailService, templateId, templateParams, publicKey).then(
      function (response) {
        console.log(
          "E-mail enviado com sucesso!",
          response.status,
          response.text
        );
      },
      function (error) {
        console.error("Erro ao enviar o e-mail:", error);
      }
    );
  };

  return (
    <div className="cliente-info-container">
      <h2 className="cadastro-title">Lista de Cadastros</h2>
      <ul className="cadastro-list">
        {cadastros.length > 0 ? (
          cadastros.map((cadastro, index) => (
            <li key={index} className="cliente-item">
              <div
                className="group-title"
                onClick={() => handleDropdownToggle(index)}
              >
                <div className="dropdown-title">
                  Cliente {index + 1} - {cadastro.dadosProprietario.nome}{" "}
                </div>
                <FaChevronDown />
              </div>
              {expandedItems[index] && (
                <>
                  <div className="title">Data e Hora do Cadastro</div>{" "}
                  {new Date(cadastro.dataCadastro).toLocaleString()}
                  <div className="title">Dados do Veículo</div>
                  <ul className="veiculo-list">
                    <li>
                      <span>Placa:</span> {cadastro.dadosVeiculo.placa}
                    </li>
                    <li>
                      <span>Modelo:</span> {cadastro.dadosVeiculo.modelo}
                    </li>
                    <li>
                      <span>Ano Fabricação:</span>{" "}
                      {cadastro.dadosVeiculo.anoFabricacao}
                    </li>
                    <li>
                      <span>Cor:</span> {cadastro.dadosVeiculo.cor}
                    </li>
                  </ul>
                  <div className="title">Dados das Peças</div>
                  <ul className="peca-list">
                    {cadastro.pecas.map((peca, pecaIndex) => (
                      <li key={pecaIndex}>
                        <div>
                          <span>Peça {pecaIndex + 1}:</span>
                        </div>
                        <br />
                        <div>
                          <span>Nome:</span> {peca.nome}
                        </div>
                        <div>
                          <span>Número de Série:</span> {peca.numeroSerie}
                        </div>
                        <div>
                          <span>Descrição:</span> {peca.descricao}
                        </div>
                      </li>
                    ))}
                  </ul>
                  <div className="title">Dados de Revisão</div>
                  <ul className="revisao-list">
                    <li>
                      <span>Data Revisão:</span>{" "}
                      {cadastro.dadosRevisao.dataRevisao}
                    </li>
                  </ul>
                  <div className="title">Dados do Proprietário</div>
                  <ul className="proprietario-list">
                    <li>
                      <span>Nome:</span> {cadastro.dadosProprietario.nome}
                    </li>
                    <li>
                      <span>Endereço:</span>{" "}
                      {cadastro.dadosProprietario.endereco}
                    </li>
                    <li>
                      <span>Telefone:</span>{" "}
                      {cadastro.dadosProprietario.telefone}
                    </li>
                    <li>
                      <span>Email:</span> {cadastro.dadosProprietario.email}
                    </li>
                  </ul>
                  <div className="group-button">
                    <button
                      className="btn-send"
                      onClick={() => handleEnviarEmail(index)}
                    >
                      Enviar E-mail de Notificação
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDeleteCadastro(index)}
                    >
                      Deletar
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        ) : (
          <p className="no-cadastro-message">Nenhum cadastro encontrado.</p>
        )}
      </ul>
    </div>
  );
}

export default ClienteInfo;
