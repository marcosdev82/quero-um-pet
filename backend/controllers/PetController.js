const Pet = require('../models/Pets')


module.exports =  class PetController {

    static async create(req, res) {
      res.json({message: 'Deu certo'})
    }
}
