const ContactsRepository = require('../repositories/ContactsRepository');

// O controller é responsável por gerenciar a regra de negócio da nossa aplicação
// Singleton -> design  patterns que diz que só vamos trabalhar com uma instância
//  da nossa aplicação salva a instância na memória

class ContactController {
  async index(request, response) {
    const contacts = await ContactsRepository.findAll();
    return response.status(200).json(contacts);
  }

  async show(request, response) {
    try {
      const { id } = request.params;
      const findContact = await ContactsRepository.findById(id);
      if (!findContact) {
        return response.status(404).json({ message: 'Contact Not found' });
      }

      return response.status(200).json(findContact);
    } catch (error) {
      return response.status(404).json({ message: 'Ressource not found' });
    }
  }

  async store(request, response) {
    try {
      const {
        name, email, phone, category_id,
      } = request.body;
      const contactExists = await ContactsRepository.findByEmail(email);

      if (contactExists) {
        return response.status(400).json({ message: 'This e-mail is already been taken' });
      }

      const contact = await ContactsRepository.create({
        name, email, phone, category_id,
      });
      return response.status(201).json(contact);
    } catch (error) {
      console.log(error);
      return response.status(400).json({ message: 'Invalid Request' });
    }
  }

  update(request, response) {
    // Editar um registro
  }

  async delete(request, response) {
    try {
      const { id } = request.params;

      const contact = await ContactsRepository.findById(id);
      if (!contact) {
        return response.status(404).json({ message: 'This contact does not exits' });
      }
      const success = await ContactsRepository.delete(id);
      return response.status(200).json({ success });
    } catch (error) {
      return response.status(400).json({ message: 'Invalid Request' });
    }
  }
}

module.exports = new ContactController();
