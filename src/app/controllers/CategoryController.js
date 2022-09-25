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

  async store(request, response) {
    try {
      const { name } = request.body;
      if (!name) {
        return response.status(400).json({ message: 'Field name is required' });
      }

      const categoryExists = await CategoryRepository.findByName(name);

      if (categoryExists) {
        return response.status(400).json({ message: 'This name is already exists' });
      }

      const newCategory = await CategoryRepository.create(name);

      return response.status(201).json(newCategory);
    } catch (error) {
      return response.status(400).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
