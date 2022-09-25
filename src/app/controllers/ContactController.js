const ContactsRepository = require('../repositories/ContactsRepository');
const AppError = require('../errors');
// O controller é responsável por gerenciar a regra de negócio da nossa aplicação
// Singleton -> design  patterns que diz que só vamos trabalhar com uma instância
//  da nossa aplicação salva a instância na memória

class ContactController {
  async index(request, response) {
    try {
      const { orderBy } = request.query;
      const contacts = await ContactsRepository.findAll(orderBy);
      return response.status(200).json(contacts);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const findContact = await ContactsRepository.findById(id);
      if (!findContact) throw new AppError('Contact not found!', 404);
      return response.status(200).json(findContact);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  async store(request, response) {
    try {
      const {
        name, email, phone, category_id,
      } = request.body;

      if (!name) throw new AppError('Field name is required', 400);

      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) throw new AppError('This e-mails is already in used', 400);

      const contact = await ContactsRepository.create({
        name, email, phone, category_id,
      });
      return response.status(201).json(contact);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, email, phone, category_id,
    } = request.body;

    // name is the only required field
    const findContactById = await ContactsRepository.findById(id);
    if (!findContactById) throw new AppError('Ressource not found!', 400);

    if (!name) throw new AppError('Field name is required', 400);

    const contactExists = await ContactsRepository.findByEmail(email);
    if (contactExists && findContactById.id !== id) throw new AppError('This e-mail is already in used', 400);

    const updatedContact = await ContactsRepository.update(id, {
      id,
      name,
      email,
      phone,
      category_id,
    });

    return response.status(200).json(updatedContact);
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const contact = await ContactsRepository.findById(id);
      if (!contact) throw new AppError('This contact does not exists', 400);
      const success = await ContactsRepository.delete(id);
      return response.status(200).json({ success: true });
    } catch (error) {
      return response.status(400).json({ message: 'Invalid Request' });
    }
  }
}

module.exports = new ContactController();
