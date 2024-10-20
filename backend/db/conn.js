const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://getapet:getapet@mongo:27017/')
    console.log('Conectou ao mongoose')
}

main().catch((err) => console.log(err))

module.exports = mongoose