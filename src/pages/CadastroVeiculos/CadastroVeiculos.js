import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./CadastroVeiculos.css";

export default function CadastroVeiculos() {
  // Estados para armazenar os dados do formulário
  const [dadosVeiculo, setDadosVeiculo] = useState({
    placa: "",
    modelo: "",
    anoFabricacao: "",
    cor: "",
  });

  const [dadosPeca, setDadosPeca] = useState({
    nome: "",
    numeroSerie: "",
    descricao: "",
  });

  const [dadosRevisao, setDadosRevisao] = useState({
    dataRevisao: "",
  });

  const [dadosProprietario, setDadosProprietario] = useState({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
  });

  // Manipuladores de eventos para atualizar os estados conforme o usuário preenche o formulário
  function handleChangeVeiculo(e) {
    setDadosVeiculo({ ...dadosVeiculo, [e.target.name]: e.target.value });
  }

  function handleChangePeca(e) {
    setDadosPeca({ ...dadosPeca, [e.target.name]: e.target.value });
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

  // Manipulador de envio do formulário
  function handleSubmit(e) {
    e.preventDefault();

    // Enviar e-mail de confirmação de cadastro do cliente
    const emailService = "service_ky5altd"; // Substitua pelo seu serviço de e-mail
    const templateId = "template_ckver5h"; // Substitua pelo ID do seu template de e-mail
    const publicKey = "bVO4o_nFWQ3h_vCRs"; // Substitua pela sua Public Key

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

    // Verificar se os campos obrigatórios estão preenchidos
    // if (
    //   !dadosVeiculo.placa ||
    //   !dadosVeiculo.modelo ||
    //   !dadosVeiculo.anoFabricacao ||
    //   !dadosVeiculo.cor ||
    //   !dadosPeca.nome ||
    //   !dadosPeca.numeroSerie ||
    //   !dadosPeca.descricao ||
    //   !dadosRevisao.dataRevisao ||
    //   !dadosProprietario.nome ||
    //   !dadosProprietario.endereco ||
    //   !dadosProprietario.email ||
    //   !dadosProprietario.telefone
    // ) {
    //   alert(
    //     "Por favor, preencha todos os campos antes de enviar o formulário."
    //   );
    //   return;
    // }

    // Limpa os campos do formulário ao ser enviado
    setDadosVeiculo({
      placa: "",
      modelo: "",
      anoFabricacao: "",
      cor: "",
    });
    setDadosPeca({
      nome: "",
      numeroSerie: "",
      descricao: "",
    });
    setDadosRevisao({
      dataRevisao: "",
    });
    setDadosProprietario({
      nome: "",
      endereco: "",
      email: "",
      telefone: "",
    });

    // Lógica para enviar os dados para o backend ou realizar outras operações necessárias
    console.log("Dados do Veículo:", dadosVeiculo);
    console.log("Dados da Peça:", dadosPeca);
    console.log("Dados de Revisão:", dadosRevisao);
    console.log("Dados do Proprietário:", dadosProprietario);
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
        />
      </label>

      <h2>Cadastro de Peça</h2>
      <label>
        Nome:
        <input
          type="text"
          name="nome"
          placeholder="Ex: Pneu"
          value={dadosPeca.nome}
          onChange={handleChangePeca}
        />
      </label>
      <label>
        Número de Série:
        <input
          type="text"
          name="numeroSerie"
          placeholder="Ex: 123456789"
          value={dadosPeca.numeroSerie}
          onChange={handleChangePeca}
        />
      </label>
      <label>
        Descrição:
        <input
          type="text"
          name="descricao"
          placeholder="Insira uma descrição breve da peça"
          value={dadosPeca.descricao}
          onChange={handleChangePeca}
        />
      </label>

      <h2>Cadastro de Data de Revisão</h2>
      <label>
        Data de Revisão:
        <input
          type="text"
          name="dataRevisao"
          placeholder="Ex: 05/12/2023"
          value={dadosRevisao.dataRevisao}
          onChange={handleChangeRevisao}
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
        />
      </label>

      <button type="submit">Cadastrar</button>
    </form>
  );
}
