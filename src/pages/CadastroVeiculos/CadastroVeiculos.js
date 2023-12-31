import React, { useState } from "react";
// Biblioteca de notificação de e-mail
import emailjs from "emailjs-com";
// Importando o CSS
import "./CadastroVeiculos.css";
// Importando os ícones
import { IoAddSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

import axios from "axios";

export default function CadastroVeiculos() {
  // Criando os estados para os dados do formulário
  const [dadosVeiculo, setDadosVeiculo] = useState({
    placa: "",
    modelo: "",
    anoFabricacao: "",
    cor: "",
  });

  const [pecas, setPecas] = useState([
    {
      nome: "",
      numeroSerie: "",
      descricao: "",
    },
  ]);

  const [dadosRevisao, setDadosRevisao] = useState({
    dataRevisao: "",
  });

  const [dadosProprietario, setDadosProprietario] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
  });

  // Controlando os eventos para atualizar os estados conforme o usuário preenche o formulário
  function handleChangeVeiculo(e) {
    setDadosVeiculo({ ...dadosVeiculo, [e.target.name]: e.target.value });
  }

  function handleChangePeca(e, index) {
    const novasPecas = [...pecas];
    novasPecas[index] = {
      ...novasPecas[index],
      [e.target.name]: e.target.value,
    };
    setPecas(novasPecas);
  }

  function handleChangeRevisao(e) {
    setDadosRevisao({ ...dadosRevisao, [e.target.name]: e.target.value });
  }

  function handleChangeProprietario(e) {
    setDadosProprietario({
      ...dadosProprietario,
      [e.target.name]: e.target.value,
    });
  }

  // Função para add campo de peças
  function adicionarPeca() {
    setPecas([...pecas, { nome: "", numeroSerie: "", descricao: "" }]);
  }

  // Remove o campo de peça
  const handleRemovePeca = (index) => {
    if (pecas.length === 1) {
      alert("Você deve ter pelo menos uma peça cadastrada.");
      return;
    }

    const updatedPecas = [...pecas];
    updatedPecas.splice(index, 1);
    setPecas(updatedPecas);
  };

  // Envio do formulário
  function handleSubmit(e) {
    e.preventDefault();

    // Criar um objeto com os dados do cadastro
    const novoCadastro = {
      dadosVeiculo,
      pecas,
      dadosRevisao,
      dadosProprietario,
    };

    // Enviar os dados para o backend
    axios
      .post("http://localhost:3001/cadastros", novoCadastro)
      .then((response) => {
        console.log("Cadastro enviado com sucesso:", response.data);
      })
      .catch((error) => {
        console.error("Erro ao enviar cadastro:", error);
      });

    // Enviar e-mail de confirmação de cadastro do cliente
    const emailService = "service_ky5altd"; // Serviço de e-mail
    const templateId = "template_ckver5h"; // Template de e-mail
    const publicKey = "1ycY8C-XgGXmq8Vg8"; // Public Key

    const templateParams = {
      to_name: dadosProprietario.nome,
      message:
        "É com grande satisfação que confirmamos o seu cadastro no Sistema de Gerenciamento de Veículos e Manutenção. Estamos à disposição para qualquer suporte necessário.",
      email: dadosProprietario.email,
    };

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

    // Limpar os campos do formulário ao ser enviado
    setDadosVeiculo({
      placa: "",
      modelo: "",
      anoFabricacao: "",
      cor: "",
    });
    setPecas([
      {
        nome: "",
        numeroSerie: "",
        descricao: "",
      },
    ]);
    setDadosRevisao({
      dataRevisao: "",
    });
    setDadosProprietario({
      nome: "",
      endereco: "",
      email: "",
      telefone: "",
    });

    // Verificação de e-mail válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(dadosProprietario.email)) {
      alert("Por favor, insira um e-mail válido.");
      return;
    }

    // Verificação de placa de veículo válida
    const placaRegex = /^[A-Za-z]{3}-\d{4}$/;
    if (!placaRegex.test(dadosVeiculo.placa)) {
      alert(
        "Por favor, insira uma placa de veículo válida no formato ABC-1234."
      );
      return;
    }

    // Verificação de telefone válido (formato: (00) 00000-0000)
    const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    if (!telefoneRegex.test(dadosProprietario.telefone)) {
      alert(
        "Por favor, insira um número de telefone válido no formato (00) 00000-0000."
      );
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Veículo</h2>
      <label>
        Placa:
        <input
          type="text"
          name="placa"
          placeholder="Ex: ABC-1234"
          value={dadosVeiculo.placa}
          onChange={handleChangeVeiculo}
          required
        />
      </label>
      <label>
        Modelo:
        <input
          type="text"
          name="modelo"
          placeholder="Ex: Gol"
          value={dadosVeiculo.modelo}
          onChange={handleChangeVeiculo}
          required
        />
      </label>
      <label>
        Ano de Fabricação:
        <input
          type="text"
          name="anoFabricacao"
          placeholder="Ex: 2020"
          value={dadosVeiculo.anoFabricacao}
          onChange={handleChangeVeiculo}
          required
        />
      </label>
      <label>
        Cor:
        <input
          type="text"
          name="cor"
          placeholder="Ex: Preto"
          value={dadosVeiculo.cor}
          onChange={handleChangeVeiculo}
          required
        />
      </label>
      <h2>Cadastro de Peça</h2>
      {pecas.map((peca, index) => (
        <div key={index}>
          <label>
            Nome:
            <input
              type="text"
              name="nome"
              placeholder="Ex: Pneu"
              value={peca.nome}
              onChange={(e) => handleChangePeca(e, index)}
              required
            />
          </label>
          <label>
            Número de Série:
            <input
              type="text"
              name="numeroSerie"
              placeholder="Ex: 123456789"
              value={peca.numeroSerie}
              onChange={(e) => handleChangePeca(e, index)}
              required
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              name="descricao"
              placeholder="Insira uma descrição breve da peça"
              value={peca.descricao}
              onChange={(e) => handleChangePeca(e, index)}
              required
            />
          </label>
          <button
            type="button"
            className="btn-remove"
            onClick={() => handleRemovePeca(index)}
          >
            <FaRegTrashAlt />
            <p>Remover Peça</p>
          </button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={adicionarPeca}>
        <IoAddSharp /> <p>Adicionar Peça</p>
      </button>

      <h2>Cadastro de Data de Revisão</h2>
      <label>
        Data de Revisão:
        <input
          type="date"
          name="dataRevisao"
          placeholder="Ex: 05/12/2023"
          value={dadosRevisao.dataRevisao}
          onChange={handleChangeRevisao}
          required
        />
      </label>

      <h2>Cadastro de Proprietário</h2>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          placeholder="Ex: Paulo Oliveira"
          value={dadosProprietario.nome}
          onChange={handleChangeProprietario}
          required
        />
      </label>
      <label>
        Endereço:
        <input
          type="text"
          name="endereco"
          placeholder="Ex: Rua da Sorte, 777"
          value={dadosProprietario.endereco}
          onChange={handleChangeProprietario}
          required
        />
      </label>
      <label>
        E-mail:
        <input
          type="text"
          name="email"
          placeholder="Ex: exemplo@email.com"
          value={dadosProprietario.email}
          onChange={handleChangeProprietario}
          required
        />
      </label>
      <label>
        Telefone:
        <input
          type="text"
          name="telefone"
          placeholder="Ex: (00) 00000-0000"
          value={dadosProprietario.telefone}
          onChange={handleChangeProprietario}
          required
        />
      </label>

      <button type="submit" className="btn-submit">
        Cadastrar
      </button>
    </form>
  );
}
