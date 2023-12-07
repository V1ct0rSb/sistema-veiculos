import React, { useState } from "react";
// import emailjs from "emailjs-com";
import "./CadastroVeiculos.css";
import { IoAddSharp } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CadastroVeiculos() {
  // Definindo os estados para cada campo do formulário
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

  // Função para add peças
  function adicionarPeca() {
    setPecas([...pecas, { nome: "", numeroSerie: "", descricao: "" }]);
  }

  // Remove a peça do cadastro
  const handleRemovePeca = (index) => {
    // Ensure that there is always at least one peça
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

    const novoCadastro = {
      dadosVeiculo,
      pecas,
      dadosRevisao,
      dadosProprietario,
    };

    // Enviar e-mail de confirmação de cadastro do cliente
    // const emailService = "service_ky5altd"; // Substitua pelo seu serviço de e-mail
    // const templateId = "template_ckver5h"; // Substitua pelo ID do seu template de e-mail
    // const publicKey = "bVO4o_nFWQ3h_vCRs"; // Substitua pela sua Public Key

    // const templateParams = {
    //   to_name: dadosProprietario.nome,
    //   message:
    //     "É com grande satisfação que confirmamos o seu cadastro no Sistema de Gerenciamento de Veículos e Manutenção. Estamos à disposição para qualquer suporte necessário.",
    //   email: dadosProprietario.email,
    // };

    // emailjs.send(emailService, templateId, templateParams, publicKey).then(
    //   function (response) {
    //     console.log(
    //       "E-mail enviado com sucesso!",
    //       response.status,
    //       response.text
    //     );
    //   },
    //   function (error) {
    //     console.error("Erro ao enviar o e-mail:", error);
    //   }
    // );

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

    // Recupera os dados existentes do localStorage
    const storedCadastros = JSON.parse(localStorage.getItem("cadastros")) || [];

    // Adiciona o novo registro aos dados existentes
    storedCadastros.push(novoCadastro);

    // Armazena os dados atualizados no localStorage
    localStorage.setItem("cadastros", JSON.stringify(storedCadastros));

    // Lógica para enviar os dados para o backend ou realizar outras operações necessárias
    console.log("Dados do Veículo:", dadosVeiculo);
    console.log("Dados da Peça:", pecas); // <-- Agora, você deve usar 'pecas' em vez de 'dadosPeca'
    console.log("Dados de Revisão:", dadosRevisao);
    console.log("Dados do Proprietário:", dadosProprietario);

    // Verificação de e-mail válido
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(dadosProprietario.email)) {
    //   alert("Por favor, insira um e-mail válido.");
    //   return;
    // }

    // Verificação de placa de veículo válida
    // const placaRegex = /^[A-Za-z]{3}-\d{4}$/;
    // if (!placaRegex.test(dadosVeiculo.placa)) {
    //   alert(
    //     "Por favor, insira uma placa de veículo válida no formato ABC-1234."
    //   );
    //   return;
    // }

    // Verificação de telefone válido (formato: (00) 00000-0000)
    // const telefoneRegex = /^\(\d{2}\) \d{5}-\d{4}$/;
    // if (!telefoneRegex.test(dadosProprietario.telefone)) {
    //   alert(
    //     "Por favor, insira um número de telefone válido no formato (00) 00000-0000."
    //   );
    //   return;
    // }
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
            Remover Peça
          </button>
        </div>
      ))}
      <button type="button" className="btn-add" onClick={adicionarPeca}>
        <IoAddSharp /> Adicionar Peça
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
