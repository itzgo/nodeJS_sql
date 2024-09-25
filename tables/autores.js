const { connectTODB } = require('../Conn/connect');
const { v4: uuidv4 } = require('uuid');

async function cadastrarAutores(Nome, Sobrenome) {
    const db = await connectTODB();

    const sql = `INSERT INTO autores (Id_autor, Nome, Sobrenome) VALUES (?, ?, ?)`;
    const ref1 = uuidv4();
    const ref2 = new Date().getTime();
    const Id = `${ref1}/${ref2}`;
    const params = [Id, Nome, Sobrenome];

    try {
        await db.run(sql, params);
    } catch (error) {
        console.error('Erro ao cadastrar autor:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

async function listarAutores() {
    const db = await connectTODB();
    const resultado = new Array();

    return new Promise((resolve, reject) => {
        try {
            db.all(`SELECT * FROM autores`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                rows.forEach((row) => {
                    resultado.push(row);
                });
                resolve(resultado);
            });
        } catch (error) {
            console.error('Erro ao listar autores:', error.message);
            reject(error); // Rejeita a promessa em caso de erro
        } finally {
            db.close(); // Fecha a conexão após a consulta
        }
    });
};

async function deletarAutores(Id_autor) {
    const db = await connectTODB();
    const sql = `DELETE FROM autores WHERE Id_autor = ?`;

    try {
        await db.run(sql, Id_autor);
    } catch (error) {
        console.error('Erro ao deletar autor:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

async function atualizarAutores(Id_autor, Nome, Sobrenome) {
    const db = await connectTODB();
    const sql = `UPDATE autores SET Nome = ?, Sobrenome = ? WHERE Id_autor = ?`;
    const params = [Nome, Sobrenome, Id_autor];

    try {
        await db.run(sql, params);
    } catch (error) {
        console.error('Erro ao atualizar autor:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

module.exports = { cadastrarAutores, listarAutores, deletarAutores, atualizarAutores };