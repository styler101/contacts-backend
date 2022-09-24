const { v4: uuidV4 } = require('uuid');
const { update } = require('../controllers/ContactController');

let contacts = [
  {
    id: uuidV4(),
    name: 'Lucas',
    email: 'lucas@gmail.com',
    phone: '12345678',
    category_id: uuidV4(),
  },

  {
    id: uuidV4(),
    name: 'José',
    email: 'jose@gmail.com',
    phone: '12345678',
    category_id: uuidV4(),
  },

];

class ContactsRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(contacts);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      const findContact = contacts.find((item) => item.id === id);
      resolve(findContact);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      const findContact = contacts.find((contact) => contact.email === email);
      resolve(findContact);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      contacts = contacts.filter((item) => item.id !== id);
      resolve(true);
    });
  }

  create({
    name, email, category_id, phone,
  }) {
    return new Promise((resolve) => {
      const newContact = {
        id: uuidV4(),
        name,
        email,
        category_id,
        phone,
      };
      contacts.push(newContact);
      resolve(newContact);
    });
  }

  update(id, {
    name, email, category_id, phone,
  }) {
    return new Promise((resolve) => {
      const findIndex = contacts.findIndex((item) => item.id === id);
      const findContactById = contacts.find((item) => item.id === id);
      const updatedValues = {
        name,
        email,
        category_id,
        phone,
      };
      contacts[findIndex] = updatedValues;
      resolve(updatedValues);
    });
  }
}

module.exports = new ContactsRepository();
