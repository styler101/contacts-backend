const CategoryRepository = require('../repositories/CategoryRepository');
const AppError = require('../errors');

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

  async show(request, response) {
    try {
      const { id } = request.params;
      const category = await CategoryRepository.findById(id);
      if (!category) throw new AppError('Ressource not found!', 400);

      return response.status(200).json(category);
    } catch (error) {
      return response.status(400).json({ success: false, message: error.message });
    }
  }

  async store(request, response) {
    try {
      const { name } = request.body;
      if (!name) throw new AppError('Field name is required', 400);

      const categoryExists = await CategoryRepository.findByName(name);

      if (categoryExists) throw new AppError('This name is already exists', 400);

      const newCategory = await CategoryRepository.create(name);
      return response.status(201).json(newCategory);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }
}

module.exports = new CategoryController();
