const { connectTODB } = require('../Conn/connect');
const { v4: uuidv4 } = require('uuid');

async function cadastrarEnderecos(Logradouro, Numero, Complemento, Id_autor) {
    const db = await connectTODB();

    const sql = `INSERT INTO endereco (Id_endereco, Logradouro, Numero, Complemento, Id_autor) VALUES (?, ?, ?, ?, ?)`;
    const ref1 = uuidv4();
    const ref2 = new Date().getTime();
    const Id = `${ref1}/${ref2}`;
    const params = [Id, Logradouro, Numero, Complemento, Id_autor];

    try {
        await db.run(sql, params);
    } catch (error) {
        console.error('Erro ao cadastrar endereço:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

async function listarEnderecos() {
    const db = await connectTODB();
    const resultado = new Array();

    return new Promise((resolve, reject) => {
        try {
            db.all(`SELECT * FROM endereco`, [], (err, rows) => {
                if (err) {
                    return reject(err);
                }
                rows.forEach((row) => {
                    resultado.push(row);
                });
                resolve(resultado);
            });
        } catch (error) {
            console.error('Erro ao listar endereços:', error.message);
            reject(error); // Rejeita a promessa em caso de erro
        } finally {
            db.close(); // Fecha a conexão após a consulta
        }
    });
};

async function deletarEnderecos(Id_endereco) {
    const db = await connectTODB();
    const sql = `DELETE FROM endereco WHERE Id_endereco = ?`;

    try {
        await db.run(sql, Id_endereco);
    } catch (error) {
        console.error('Erro ao deletar endereço:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

async function atualizarEnderecos(Id_endereco, Logradouro, Numero, Complemento) {
    const db = await connectTODB();
    const sql = `UPDATE endereco SET Logradouro = ?, Numero = ?, Complemento = ? WHERE Id_endereco = ?`;
    const params = [Logradouro, Numero, Complemento, Id_endereco];

    try {
        await db.run(sql, params);
    } catch (error) {
        console.error('Erro ao atualizar endereço:', error.message);
        throw error; // Propaga o erro para o chamador
    } finally {
        await db.close(); // Garante que a conexão seja fechada
    }
};

module.exports = { cadastrarEnderecos, listarEnderecos, deletarEnderecos, atualizarEnderecos };