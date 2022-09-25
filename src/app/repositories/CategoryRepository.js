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

  async create(name) {
    const [row] = await database.query('INSERT INTO categories(name) values($1) RETURNING *', [name]);
    return row;
  }
}

module.exports = new CategoryRepository();
