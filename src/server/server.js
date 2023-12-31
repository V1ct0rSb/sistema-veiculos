const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connection = require("./db");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(bodyParser.json());

app.post("/cadastros", async (req, res) => {
  const novoCadastro = req.body;

  try {
    const [result] = await connection.execute(
      "INSERT INTO dadosVeiculo (placa, modelo, anoFabricacao, cor, status) VALUES (?, ?, ?, ?, 'pendente')",
      [
        novoCadastro.dadosVeiculo.placa,
        novoCadastro.dadosVeiculo.modelo,
        novoCadastro.dadosVeiculo.anoFabricacao,
        novoCadastro.dadosVeiculo.cor,
      ]
    );

    const cadastroId = result.insertId;

    // Inserir pecas
    await Promise.all(
      novoCadastro.pecas.map((peca) =>
        connection.execute(
          "INSERT INTO pecas (cadastro_id, nome, numeroSerie, descricao) VALUES (?, ?, ?, ?)",
          [cadastroId, peca.nome, peca.numeroSerie, peca.descricao]
        )
      )
    );

    // Inserir dadosRevisao
    await connection.execute(
      "INSERT INTO dadosRevisao (cadastro_id, dataRevisao) VALUES (?, ?)",
      [cadastroId, novoCadastro.dadosRevisao.dataRevisao]
    );

    // Inserir dadosProprietario
    await connection.execute(
      "INSERT INTO dadosProprietario (cadastro_id, nome, endereco, email, telefone) VALUES (?, ?, ?, ?, ?)",
      [
        cadastroId,
        novoCadastro.dadosProprietario.nome,
        novoCadastro.dadosProprietario.endereco,
        novoCadastro.dadosProprietario.email,
        novoCadastro.dadosProprietario.telefone,
      ]
    );

    res.status(201).send({ message: "Cadastro adicionado com sucesso." });
  } catch (error) {
    console.error("Erro ao cadastrar informações do cliente:", error);
    res
      .status(500)
      .send({ message: "Erro ao cadastrar informações do cliente." });
  }
});

// Aqui vai fazer o get de todos os cadastros
app.get("/cadastros", async (req, res) => {
  try {
    const [veiculos] = await connection.execute("SELECT * FROM dadosVeiculo");
    const cadastros = await Promise.all(
      veiculos.map(async (veiculo) => {
        const [pecas] = await connection.execute(
          "SELECT * FROM pecas WHERE cadastro_id = ?",
          [veiculo.id]
        );
        const [dadosRevisao] = await connection.execute(
          "SELECT * FROM dadosRevisao WHERE cadastro_id = ?",
          [veiculo.id]
        );
        const [dadosProprietarios] = await connection.execute(
          "SELECT * FROM dadosProprietario WHERE cadastro_id = ?",
          [veiculo.id]
        );

        return {
          ...veiculo,
          pecas,
          dadosRevisao: dadosRevisao[0], // assumindo que há apenas um registro de revisão por veículo
          dadosProprietarios, // assumindo que pode haver mais de um proprietário por veículo
        };
      })
    );

    res.status(200).send(cadastros);
  } catch (error) {
    console.error("Erro ao recuperar cadastros:", error);
    res.status(500).send({ message: "Erro ao recuperar cadastros." });
  }
});

// Pendente e Concluido
app.put("/cadastros/:id/concluir", async (req, res) => {
  const cadastroId = req.params.id;

  try {
    await connection.execute(
      "UPDATE dadosVeiculo SET status = 'concluido' WHERE id = ?",
      [cadastroId]
    );

    res.status(200).send({ message: "Trabalho concluído com sucesso." });
  } catch (error) {
    console.error("Erro ao concluir o trabalho:", error);
    res.status(500).send({ message: "Erro ao concluir o trabalho." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
