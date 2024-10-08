const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'Steven',
    password: '51919616Nexus',
    database: 'EpaArepaRellena'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL.');
});

module.exports = connection;
