const User = require('../models/User')

const bcrypt = require('bcrypt')

const createUserToken = require('../helpers/create-user-token')

module.exports =  class UserController {
    static async register(req, res) {
        const {name, email, phone, password} = req.body

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
        
        // if (!confirmpassword) {
        //     res.status(422).json({message: 'A confirmação de senha é obrigatória'})
        //     return
        // }

        // if (password !== confirmpassword) {
        //     res.status(422).json({message: 'A senha e a confirmação de senha precisam ser iguais'})
        //     return
        // }

        // check is usre exists
        const userExists = await User.findOne({email: email})

        if (userExists) {
            res.status(422).json({message: 'Por favor, utilize outro email!'})
            return
        }

        const salt = await bcrypt.genSalt(12)
        const passworHash = await bcrypt.hash(password, salt)

        const user = new User({
            name,
            email,
            phone,
            password: passworHash,
            // confirmpassword: confirmpassword
        });

        try {
            const newUser = await user.save();
            await createUserToken(newUser, req, res)
        } catch (error) {
            res.status(500).json({message: error }) 
        }
        
    }

    static async login(req, res) {
        const { email, password } = req.body

         // validations
        if (!email) {
            res.status(422).json({message: 'O e-mail é obrigatório'})
            return
        }

        if (!password) {
            res.status(422).json({message: 'O password é obrigatório'})
            return
        }

        // check is usre exists
        const user = await User.findOne({email: email})

        if (!user) {
            res.status(422).json({message: 'Não há usuário cadastrado com este e-mail!'})
            return
        }

        // check if password match width db password
        const checkPassword = await bcrypt.compare(password, user.password)

        if (!checkPassword) {
            res.status(422).json({message: 'Senha inválida!'})
            return
        }

        await createUserToken(user, req, res)
    }
}