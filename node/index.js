const express = require('express');
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb',
};
const mysql = require('mysql');
const connection = mysql.createConnection(config);

connection.query(`CREATE TABLE if not exists people (id int not null auto_increment, name varchar(255), primary key(id))`);
connection.query(`INSERT INTO people (name) VALUES ('abner')`);


app.get('/', (req, res) => {

    connection.query(`SELECT * FROM people`, function (error, results, fields) {
        if (error) throw error;

        let pessoas = `
            <p>Tabela people</p>
            <table border='1' style='border-collapse: collapse;'>
                <tr>
                    <td style='padding: 5px;'>ID</td>
                    <td style='padding: 5px;'>NAME</td>
                </tr>
        `;
        for(i = 0; i < results.length; i++) {
            pessoas += `
                <tr>
                    <td style='padding: 5px;'>${results[i].id}</td>
                    <td style='padding: 5px;'>${results[i].name}</td>
                </tr>
            `;
        }
        pessoas += '</table>';

        
        res.send('<h1>Full Cycle Rocks!</h1>' + pessoas)
    })
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})