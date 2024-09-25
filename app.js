const express = require('express')
const app = express()
const port = 3000

app.use(express.json());

const { connectTODB } = require('./Conn/connect')
const { cadastrarLivros, listarLivros, deletarLivros, atualizarLivros } = require('./tables/livros')
const { cadastrarAutores, listarAutores, deletarAutores, atualizarAutores } = require('./tables/autores')
const { cadastrarEnderecos, listarEnderecos, deletarEnderecos, atualizarEnderecos } = require('./tables/endereco')

app.get('/', async (req, res) => {

  try {
    const checkConn = await connectTODB()

    checkConn.serialize(() => {

      checkConn.get("SELECT 1", [], (err, row) => {
        if (err) {

          return res.status(500).json({
            stack: err.stack,
            message: err.message
          })
        }
      })
    })

    res.status(200).json({
      status: 'successo',
      message: 'Conexão bem-sucedida com o banco de dados SQLite.',
    })

  } catch (error) {
    res.status(500).json({
      stack: error.stack,
      message: error.message
    });
  }
});

app.post('/cadastrarAutores', async (req, res) => {
  try {

    const { Nome, Sobrenome } = req.body;

    await cadastrarAutores(Nome, Sobrenome)

    return res.status(200).json({

      message: "Operação realizada com sucesso"
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    })
  }
});

app.get('/listarAutores', async (req, res) => {
  try {

    const resultado = await listarAutores()

    return res.status(200).json({
      resultado
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    })
  }
});

app.delete('/deletarAutores', async (req, res) =>{
  try{
    const { Id_autor } = req.body

    await deletarAutores(Id_autor)

    return res.status(200).json({
      message: "Operação realizada com sucesso"
    });
  } catch( error){

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    });
  }

});

app.put('/AtualizarAutores', async (req, res) => {
  try {

    const { Id_autor, Nome, Sobrenome } = req.body;

    await atualizarAutores(Id_autor, Nome, Sobrenome)

    return res.status(200).json({
      message: "Operação realizada com sucesso"
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    });
  }
});

app.post('/cadastrarEndereco', async (req, res) => {
  try {

    const { Logradouro, Numero, Complemento, Id_autor } = req.body;

    await cadastrarEnderecos( Logradouro, Numero, Complemento, Id_autor )

    return res.status(200).json({

      message: "Operação realizada com sucesso"
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    })
  }
});

app.get('/listarEnderecos', async (req, res) => {
  try {

    const resultado = await listarEnderecos()

    return res.status(200).json({
      resultado
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    })
  }
});

app.delete('/deletarEnderecos', async (req, res) =>{
  try{
    const { Id_endereco } = req.body;

    await deletarEnderecos(Id_endereco)

    return res.status(200).json({
      message: "Operação realizada com sucesso"
    });
  } catch( error){

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    });
  }
});

app.put('/AtualizarEnderecos', async (req, res) => {
  try {

    const { Id_endereco, Logradouro, Numero, Complemento } = req.body;

    await atualizarEnderecos(Id_endereco, Logradouro, Numero, Complemento)

    return res.status(200).json({
      message: "Operação realizada com sucesso"
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    });
  }
});

app.post('/cadastrarLivros', async (req, res) => {
  try {

    const { Titulo, Id_autor } = req.body;

    await cadastrarLivros( Titulo, Id_autor )

    return res.status(200).json({

      message: "Operação realizada com sucesso"
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    })
  }
});

app.get('/listarLivros', async (req, res) => {
  try {

    const resultado = await listarLivros()

    return res.status(200).json({
      resultado
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    })
  }
});

app.delete('/deletarLivros', async (req, res) =>{
  try{
    const { Id_livro } = req.body;

    await deletarLivros(Id_livro)

    return res.status(200).json({
      message: "Operação realizada com sucesso"
    });
  } catch( error){

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    });
  }

});

app.put('/AtualizarLivros', async (req, res) => {
  try {

    const { Id_livro, Titulo } = req.body;

    await atualizarLivros(Id_livro, Titulo)

    return res.status(200).json({
      message: "Operação realizada com sucesso"
    });

  } catch (error) {

    return res.status(500).json({
      stack: error.stack,
      message: error.message
    });
  }
});

app.listen(port, () => {

  console.log(`Example app listening on port ${port}`)
});

// http://localhost:3000
