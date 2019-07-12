const express = require('express')
const bodyParser = require('body-parser')
const { abrirConexao} = required('./mysql')
let conexao
const app = express()

app.use(bodyParser.json())

app.get('/cadastro', (req, res) => {
    conexao.query('SELECT * FROM dados_de_acesso', (error, results) => {
        if (error) {
            console.error(error)
            return res.sendStatus(500)
        }

        res.json(results)
    })
})
app.post('/cadastro', (req, res) => {
    const {login, email, senha, pin} = req.body
    conexao.query(`
        INSERT INTO dados_de_acesso
            (login, email, senha, pin)
            VALUES
            ('${login}', '${email}', '${senha}', '${pin})
    `, (error, results) => {
        if (error){
            console.error(error)
            return res.sendStatus(500)
        }
        res.send('pessoa cadastrada')
    })
    
})  
app.delete('/cadastro/', (req, res) => {
    const { id } = req.params
    
    conexao.query(`DELETE FROM dados_de_acesso WHERE id='${ id }'
    `, (error) => {
        if (error) {
            console.error(error)
            return res.sendStatus(500)
        }

        res.send('pessoa deletada')
    })
})
app.use(express.static('./ui'))

app.listen(3000, async () => {
    console.log('servidor esta escutando na porta 3000')

    conexao = await abrirConexao()
    console.log( conexao.state )
})
