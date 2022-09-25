const database = require('../database');

class CategoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy === 'DESC' ? 'DESC' : 'ASC';
    const rows = await database.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return rows;
  }

  async findByName(name) {
    const [row] = await database.query('SELECT * FROM categories WHERE name=$1', [name]);
    return row;
  }

  async findById(id) {
    const [row] = await database.query('SELECT * FROM categories WHERE id=$1', [id]);
    return row;
  }

  async create(name) {
    const [row] = await database.query('INSERT INTO categories(name) values($1) RETURNING *', [name]);
    return row;
  }

  async delete(id) {
    const deleteOperation = await database.query('DELETE FROM categories WHERE id=$1', [id]);
    return deleteOperation;
  }

  async update(id, { name }) {
    const [row] = await database.query('UPDATE categories SET name=$1 WHERE id=$2 RETURNING *', [name, id]);
    return row;
  }
}

module.exports = new CategoryRepository();
