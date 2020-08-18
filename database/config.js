const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useCreateIndex: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false
        })
        console.log("DB online");

    } catch (error) {
        console.log(error);
        throw new Error('Error in db connection')

    }

}

module.exports = { dbConnection }