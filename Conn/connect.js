const sqlite3 = require('sqlite3').verbose();

async function connectTODB() {
  return new Promise((resolve, reject) => {
    const DB = new sqlite3.Database('/home/italo/Documentos/DBS/DB_Biblioteca.db', (err) => {
      if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.message);
        reject(err); // Rejeita a promise em caso de erro
      } else {
        console.log('Conectado ao banco de dados SQLite.');
        resolve(DB); // Resolve a promise com a conexão do banco de dados
      }
    });
  });
}

// Corrigido para module.exports
module.exports = { connectTODB };
