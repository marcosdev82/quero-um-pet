const User = require('../models/User')

module.exports =  class UserController {
    static async register(req, res) {
        const {name, email, phone, password, confimepassword} = req.body

        // validations
        if (!name) {
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }

        if (!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if (!phone) {
            res.status(422).json({message: 'O telefone é obrigatório'})
            return
        }
        if (!password) {
            res.status(422).json({message: 'O senha é obrigatório'})
            return
        }
        
        if (!confimepassword) {
            res.status(422).json({message: 'A confirmação de senha é obrigatória'})
            return
        }

        if (password !== confimepassword) {
            res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais'})
            return
        }

        // check is usre exists
        const userExists = await User.findOne({email: email})

        if (userExists) {
            res.status(422).json({message: 'Por favor, utilize outro email!'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passworHash = await bcrypt.has(password, salt)

        const user = new User({
            name: name,
            email: email,
            phone: phone,
            password: passwordHash,
        });

        try {
            const newUser = await user.save();
            res.status(201).json({message: 'Usuário criado'})
        } catch (error) {
            res.status(500).json({message: error })
        }
    }
}