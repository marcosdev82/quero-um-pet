const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://getapet:getapet@localhost:27017/getapet?authSource=admin')
    console.log('Conectou ao mongoose')
}

main().catch((err) => console.log(err))

module.exports = mongoose