const mysql = require('mysql')

const abrirConexao = () => {
    return new Promise(resolve => {
        const conexao = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'INICIAL1',
            database: 'methadigital'
        })
    
        conexao.connect(error => {
            if (error) {
                return console.error(error)
            }
    
            console.log('conectado no banco')
            resolve(conexao)
        })
    })

    

}

module.exports = { abrirConexao }