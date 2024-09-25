const { connectTODB } = require('../Conn/connect')
const { v4: uuidv4 } = require('uuid');

async function cadastrarLivros(Titulo, Id_autor) {
    const db = await connectTODB();

    const sql = `INSERT INTO livros ( Id_livro, Titulo, Id_autor ) VALUES (?, ?, ? )`;

    const ref1 = uuidv4();
    const ref2 = new Date().getTime()
    const Id = `${ref1}/${ref2}`

    const params = [Id, Titulo, Id_autor ];

    await db.run(sql, params);

    await db.close();
    
};

async function listarLivros() {
    const db = await connectTODB();

    const resultado = new Array();

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM livros`, [], (err, rows) => {
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

async function deletarLivros(Id_livro){
    const db = await connectTODB();

    const sql = `DELETE FROM livros WHERE Id_livro = ?`;

    await db.run(sql, Id_livro);

    await db.close();
};

async function atualizarLivros(Id_livro, Titulo ) {
    const db = await connectTODB();

    const sql = `UPDATE livros SET Titulo = ? WHERE Id_livro = ?`;

    const params = [Titulo, Id_livro];

    await db.run(sql, params);

    await db.close();
};

module.exports = { cadastrarLivros, listarLivros, deletarLivros, atualizarLivros};
