const Pet = require('../models/Pets')

// helpers
const getToken = require('../helpers/get-token')
const getUserByToken = require('../helpers/get-user-by-token')
const ObjectId = require('mongoose').Types.ObjectId

module.exports =  class PetController {

    static async create(req, res) {
      const { name, age, weight, color } = req.body
      // console.log(req.body)

      const images = req.files

      const available = true
      // image upload

      // Validations
      if (!name) {
        res.status(422).json({message: 'O nome é obrigatório!'})
        return
      }
      
      if (!age) {
        res.status(422).json({message: 'A idade é obrigatória!'})
        return
      }

      if (!weight) {
        res.status(422).json({message: 'O peso é obrigatório!'})
        return
      }

      if (!color) {
        res.status(422).json({message: 'A cor é obrigatória!'})
        return
      }

      if (images.lenth === 0) {
        res.status(422).json({message: 'A imagem é obrigatória!'})
        return
      }

      // get pet owner
      const token = getToken(req)
      const user = await getUserByToken(token)

      // create a pet
      const pet = new Pet({
        name,
        age,
        weight,
        color,
        images: [],
        user: {
          _id: user._id,
          name: user.name,
          image: user.image,
          phone: user.phone
        },
        available
      })

      images.map((images) => {
        pet.images.push(images.filename)
      })
      
      try {
        const newPet = await pet.save()
        res.status(201).json({
          message: 'Pet cadastrado com sucesso!',
          newPet,
        })
      } catch (error) {
        res.status(500).json({ message: error })
      }

    }

    static async getAll(req, res) {
      const pets = await Pet.find().sort('-createdAt')

      res.status(200).json({
        pets: pets,
      })

    }

    static async getAllUserPets(req, res) {

      // get user from token
      const token = getToken(req)
      const user = await getUserByToken(token)

      const pets = await Pet.find({ 'user._id': user._id}).sort('-createdAt')

      res.status(200).json({
        pets,
      })

    }

    static async getAllUserAdoptions(req, res) {
      
      // get user from token
      const token = getToken(req)
      const user = await getUserByToken(token)

      const pets = await Pet.find({ 'adopter._id': user._id}).sort('-createdAt')

      res.status(200).json({
        pets,
      })

    }

    static async getPetById(req, res) {
      const id =req.params.id

      if (!ObjectId.isValid(id)) {
        res.status(422).json({message: 'ID inválido!'})
        return
      }

      // check if pet exists
      const pet = await Pet.findOne({_id: id})
    
      if (!pet) {
        res.status(404).json({message: 'Pet não encontrado!'})
      }

      res.status(200).json({
        pet: pet,
      })
    }

    static async removePetById(req, res) {
      const id = req.params.id;
  
      // check ID is valid
      if (!ObjectId.isValid(id)) {
          return res.status(422).json({ message: 'ID inválido' });
      }
  
      // check if pet exists
      const pet = await Pet.findOne({ _id: id });
  
      if (!pet) {
          return res.status(404).json({ message: 'Pet não encontrado!' });
      }
  
      // check if logged in user registered the pet
      const token = getToken(req);
      const user = await getUserByToken(token);
  
      if (pet.user._id.toString() !== user._id.toString()) {
          return res.status(422).json({
              message: 'Houve um problema em processar a sua solicitação, tente novamente mais tarde!'
          });
      }
  
      await Pet.findByIdAndDelete(id);
  
      return res.status(200).json({ message: 'Pet removido com sucesso!' });
  }

  static async updatePet(req, res) {
    const id = req.params.id;
    const { name, age, weight, color, available } = req.body;
    const images = req.files;
    const updateData = {};

    // Verifica se o pet existe
    const pet = await Pet.findOne({ _id: id });
  
    if (!pet) {
        return res.status(404).json({ message: 'Pet não encontrado!' });
    }

    // Verifica se o usuário logado é o dono do pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (!user || pet.user._id.toString() !== user._id.toString()) {
        return res.status(422).json({
            message: 'Houve um problema em processar a sua solicitação, tente novamente mais tarde!'
        });
    }

    // Validações
    if (!name) {
        return res.status(422).json({ message: 'O nome é obrigatório!' });
    } else {
        updateData.name = name;
    }
    
    if (!age) {
        return res.status(422).json({ message: 'A idade é obrigatória!' });
    } else {
        updateData.age = age;
    }

    if (!weight) {
        return res.status(422).json({ message: 'O peso é obrigatório!' });
    } else {
        updateData.weight = weight;
    }

    if (!color) {
        return res.status(422).json({ message: 'A cor é obrigatória!' });
    } else {
        updateData.color = color;
    }

    if (!images || images.length === 0) {
        return res.status(422).json({ message: 'A imagem é obrigatória!' });
    } else {
        updateData.images = [];
        images.map((image) => {
            updateData.images.push(image.filename);
        });
    }

    // Atualiza os dados do pet
    await Pet.findByIdAndUpdate(id, updateData);

    return res.status(200).json({ message: 'Pet atualizado com sucesso!' });
  }

  static async schedule(req, res) {

    const id = req.params.id

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });
  
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado!' });
    }

    // check user registered the pet
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.equals(user._id.toString())) {
      return res.status(422).json({
          message: 'Você não pode agendar uma visita com seu próprio pet!'
      });
    }

    // check if user has already scheduled a visit
    if (pet.adopter) {
      if(pet.adopter._id.equals(user._id)) {
        return res.status(422).json({
          message: 'Você já agendou uma visita para este pet!'
        });
      }
    }

    // add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: user.image
    }

    await Pet.findByIdAndUpdate(id, pet)

    return res.status(422).json({
      message: `A visita vou agendada com sucesso, entre em contato com ${pet.user.name} pelo telefone ${pet.user.phone}`
    });

  }

  static async concludeAdoption(req, res) {
    const id = req.params.id

    // check if pet exists
    const pet = await Pet.findOne({ _id: id });
  
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado!' });
    }

    // check if logged in user registered the pet 
    const token = getToken(req);
    const user = await getUserByToken(token);

    if (pet.user._id.toString() !== user._id.toString()) {
        return res.status(422).json({
            message: 'Houve um problema em processar a sua solicitação, tente novamente mais tarde!'
        });
    }

    pet.avalilable = false

    await Pet.findByIdAndUpdate(id, pet)

    return res.status(422).json({
      message: 'Parabéns o ciclo de adoção foi finalizado com sucesso!'
    });
  }

  
}
