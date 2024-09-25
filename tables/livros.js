const { connectTODB } = require('../Conn/connect');
const { v4: uuidv4 } = require('uuid');

async function cadastrarLivros(Titulo, Id_autor) {
    const db = await connectTODB();
    const sql = `INSERT INTO livros (Id_livro, Titulo, Id_autor) VALUES (?, ?, ?)`;

    const ref1 = uuidv4();
    const ref2 = new Date().getTime();
    const Id = `${ref1}/${ref2}`;
    const params = [Id, Titulo, Id_autor];

    try {
        await db.run(sql, params);
    } catch (error) {
        console.error('Erro ao cadastrar livro:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

async function listarLivros() {
    const db = await connectTODB();
    const resultado = new Array();

    return new Promise((resolve, reject) => {
        try {
            db.all(`SELECT * FROM livros`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                rows.forEach((row) => {
                    resultado.push(row);
                });
                resolve(resultado);
            });
        } catch (error) {
            console.error('Erro ao listar livros:', error.message);
            reject(error); // Rejeita a promessa em caso de erro
        } finally {
            db.close(); // Fecha a conexão após a consulta
        }
    });
};

async function deletarLivros(Id_livro) {
    const db = await connectTODB();
    const sql = `DELETE FROM livros WHERE Id_livro = ?`;

    try {
        await db.run(sql, Id_livro);
    } catch (error) {
        console.error('Erro ao deletar livro:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

async function atualizarLivros(Id_livro, Titulo) {
    const db = await connectTODB();
    const sql = `UPDATE livros SET Titulo = ? WHERE Id_livro = ?`;
    const params = [Titulo, Id_livro];

    try {
        await db.run(sql, params);
    } catch (error) {
        console.error('Erro ao atualizar livro:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

module.exports = { cadastrarLivros, listarLivros, deletarLivros, atualizarLivros };
