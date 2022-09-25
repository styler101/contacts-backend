const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    try {
      const { orderBy } = request.query;
      const categories = await CategoryRepository.findAll(orderBy);
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
