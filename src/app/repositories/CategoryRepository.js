const database = require('../database');

class CategoryRepository {
  async findAll(orderBy = 'ASC') {
    const direction = orderBy === 'DESC' ? 'DESC' : 'ASC';
    const rows = await database.query(`SELECT * FROM categories ORDER BY name ${direction}`);
    return rows;
  }
}

module.exports = new CategoryRepository();
