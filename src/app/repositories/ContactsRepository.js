const { update } = require('../controllers/ContactController');
const database = require('../database');

class ContactsRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy === 'DESC' ? 'DESC' : 'ASC';
    const rows = await database.query(`SELECT * FROM contacts ORDER BY name ${direction} `);
    return rows;
  }

  async findById(id) {
    const [row] = await database.query('SELECT * FROM contacts WHERE id=$1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await database.query('SELECT * FROM contacts WHERE email=$1', [email]);
    return row;
  }

  async create({
    name, email, category_id, phone,
  }) {
    const [row] = await database.query('INSERT INTO contacts(name, email, phone,category_id) VALUES($1, $2,$3,$4) RETURNING *', [name, email, phone, category_id]);
    return row;
  }

  async update(id, {
    name, email, category_id, phone,
  }) {
    const [row] = await database.query('UPDATE contacts SET name=$1, email=$2, category_id=$3, phone=$4 WHERE id=$5 RETURNING *', [name, email, category_id, phone, id]);
    return row;
  }

  async delete(id) {
    const deleteOperation = await database.query('DELETE FROM contacts WHERE id=$1', [id]);
    return deleteOperation;
  }
}

module.exports = new ContactsRepository();
