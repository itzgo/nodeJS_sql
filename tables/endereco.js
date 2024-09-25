const { connectTODB } = require('../Conn/connect')
const { v4: uuidv4 } = require('uuid');

async function cadastrarEnderecos( Logradouro, Numero, Complemento, Id_autor ) {
    const db = await connectTODB();

    const sql = `INSERT INTO endereco (Id_endereco, Logradouro, Numero, Complemento, Id_autor ) VALUES (?, ?, ?, ?, ?)`;

    const ref1 = uuidv4();
    const ref2 = new Date().getTime()
    const Id = `${ref1}/${ref2}`

    const params = [Id, Logradouro, Numero, Complemento,Id_autor ];

    await db.run(sql, params);

    await db.close();
    
};

async function listarEnderecos() {
    const db = await connectTODB();

    const resultado = new Array();

    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM endereco`, [], (err, rows) => {
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

async function deletarEnderecos(Id_endereco){
    const db = await connectTODB();

    const sql = `DELETE FROM endereco WHERE Id_endereco = ?`;

    await db.run(sql, Id_endereco);

    await db.close();
};

async function atualizarEnderecos(Id_endereco, Logradouro, Numero, Complemento) {
    const db = await connectTODB();

    const sql = `UPDATE endereco SET Logradouro = ?, Numero = ?, Complemento = ? WHERE Id_endereco = ?`;

    const params = [Logradouro, Numero, Complemento, Id_endereco];

    await db.run(sql, params);

    await db.close();
};

module.exports = { cadastrarEnderecos, listarEnderecos, deletarEnderecos, atualizarEnderecos };
