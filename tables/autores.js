const { connectTODB } = require('../Conn/connect')
const { v4: uuidv4 } = require('uuid');

async function cadastrarAutores(Nome, Sobrenome) {
    const db = await connectTODB();

    const sql = `INSERT INTO autores ( Id_autor, Nome, Sobrenome ) VALUES (?, ?, ?)`;

    const ref1 = uuidv4();
    const ref2 = new Date().getTime()
    const Id = `${ref1}/${ref2}`

    const params = [Id, Nome, Sobrenome ];

    await db.run(sql, params);

    await db.close();
    
};

async function listarAutores() {
    const db = await connectTODB();

    const resultado = new Array();

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM autores`, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            rows.forEach((row) => {
                resultado.push(row);
            });
            db.close(); // Fecha a conexão após a consulta
            resolve(resultado);
        });
    });
};

async function deletarAutores(Id_autor){
    const db = await connectTODB();

    const sql = `DELETE FROM autores WHERE Id_autor = ?`;

    await db.run(sql, Id_autor);

    await db.close();
};

async function atualizarAutores(Id_autor, Nome, Sobrenome) {
    const db = await connectTODB();

    const sql = `UPDATE autores SET Nome = ?, Sobrenome = ? WHERE Id_autor = ?`;

    const params = [Nome, Sobrenome, Id_autor];

    await db.run(sql, params);

    await db.close();
};

module.exports = { cadastrarAutores, listarAutores, deletarAutores, atualizarAutores };
