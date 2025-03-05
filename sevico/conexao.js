import mysql from 'mysql2/promise'; // Importa o módulo mysql2 com suporte para promises.

const pool = mysql.createPool( // cria um pool de conexões com as configurações fornecidas.
    {
        host        :   'localhost', // Define o host do banco de dados como localhost.
        user        :   'root', // Define o usuário do banco de dados.
        password    :   '@Sophia56224729', // Define a senha de acesso ao banco de dados.
        database    :   'leads_db' // Define o banco de dados a ser usado.
        // multipleStatements : true
    }
);

export default pool;