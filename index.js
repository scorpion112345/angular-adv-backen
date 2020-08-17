require('dotenv').config()

const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./database/config')

// Crear el servidor de express
const app = express()

// Configurar cosr
app.use(cors())
app.use(express.json());

// db connection
dbConnection()


// Directorio publico   
app.use(express.static('public'))

// rutas
app.use('/api/usuarios', require('./routes/usuarios'))
app.use('/api/login', require('./routes/auth'))
app.use('/api/hospitales', require('./routes/hospitales'))
app.use('/api/medicos', require('./routes/medicos'))
app.use('/api/todo', require('./routes/busquedas'))
app.use('/api/uploads', require('./routes/uploads'))


app.listen(process.env.PORT, () => {
    console.log("Server is runing on port", process.env.PORT);

})