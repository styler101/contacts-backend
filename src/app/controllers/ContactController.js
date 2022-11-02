const ContactsRepository = require('../repositories/ContactsRepository')
const AppError = require('../errors')
const isValidUUID = require('../utils/validators/isValidUUID')
// O controller é responsável por gerenciar a regra de negócio da nossa aplicação
// Singleton -> design  patterns que diz que só vamos trabalhar com uma instância
//  da nossa aplicação salva a instância na memória

class ContactController {
  async index(request, response) {
    try {
      const { orderBy } = request.query
      const contacts = await ContactsRepository.findAll(orderBy)
      return response.status(200).json(contacts)
    } catch (error) {
      return response
        .status(400)
        .json({ message: 'Erro ao listar as categories' })
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params
      if (!isValidUUID(id))
        return response
          .status(400)
          .json({ message: 'Category id was not found' })
      const findContact = await ContactsRepository.findById(id)
      if (!findContact) {
        return response
          .status(404)
          .json({ message: 'This contact does not exists' })
      }
      return response.status(200).json(findContact)
    } catch (error) {
      return response.status(error.status).json({ message: error.message })
    }
  }

  async store(request, response) {
    try {
      const { name, email, phone, category_id } = request.body

      if (!name) {
        return response.status(404).json({ message: 'Field name is required' })
      }

      if (category_id && !isValidUUID(category_id)) {
        return response.status(400).json({ message: 'Invalid category' })
      }
      if (email) {
        const contactExists = await ContactsRepository.findByEmail(email)
        if (contactExists) {
          return response
            .status(400)
            .json({ message: 'This e-mails is already in used' })
        }
      }

      const contact = await ContactsRepository.create({
        name,
        email: email || null,
        phone,
        category_id: category_id || null,
      })

      return response.status(201).json(contact)
    } catch (error) {
      return response.status(error.status).json({ message: error.message })
    }
  }

  async update(request, response) {
    const { id } = request.params

    try {
      const { name, email, phone, category_id } = request.body
      if (!category_id && !isValidUUID(id)) {
        return response.status(400).json({ message: 'Invalid contact id' })
      }
      // name is the only required field
      const findContactById = await ContactsRepository.findById(id)
      if (!findContactById) {
        return response.status(400).json({ message: 'Resource not found' })
      }

      if (!name) throw new AppError('Field name is required', 400)
      if (email) {
        const contactExists = await ContactsRepository.findByEmail(email)
        if (contactExists && findContactById.id !== id) {
          return response
            .status(400)
            .json({ message: 'This e-mail is already in used' })
        }
      }

      const updatedContact = await ContactsRepository.update(id, {
        name,
        email: email || null,
        phone,
        category_id: category_id || null,
      })

      return response.status(200).json(updatedContact)
    } catch {
      return response.status(400).json({ message: 'Invalid Request' })
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params
      const contact = await ContactsRepository.findById(id)
      if (!contact) {
        return response.status(404).json({ message: 'Contact not found' })
      }

      const success = await ContactsRepository.delete(id)
      return response.status(204).send()
    } catch (error) {
      return response.status(400).json({ message: 'Invalid Request' })
    }
  }
}

module.exports = new ContactController()
