require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express()

// Configurar cosr
app.use(cors())

// db connection
dbConnection()



//mongodb://localhost/deliver
app.get('/', (req, res) => {
    res.json({
        ok: true,
        msg: "asad"
    })
})

app.listen(process.env.PORT, () => {
    console.log("Server is runing on port", process.env.PORT);

})