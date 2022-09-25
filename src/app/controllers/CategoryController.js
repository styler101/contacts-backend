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

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      const findCategoryById = await CategoryRepository.findById(id);

      if (!findCategoryById) throw new AppError('This id is not exists', 400);

      const findCategoryByName = await CategoryRepository.findByName(name);

      if (findCategoryByName && findCategoryById.id !== id) throw new AppError('This name is already in use', 400);

      const updateContact = await CategoryRepository.update(id, { name });
      console.log(updateContact);
      return response.status(200).json(updateContact);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      if (!id) throw new AppError('You must provided the id', 400);
      const categoryExists = await CategoryRepository.findById(id);
      if (!categoryExists) throw new AppError('This Ressource does not exists!', 400);
      await CategoryRepository.delete(id);
      return response.status(204).json({ success: true });
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }
}

module.exports = new CategoryController();
