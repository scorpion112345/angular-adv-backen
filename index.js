require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express()

// Configurar cosr
app.use(cors())
app.use(express.json());


// rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))


// db connection
dbConnection()





app.listen(process.env.PORT, () => {
    console.log("Server is runing on port", process.env.PORT);

})