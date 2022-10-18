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
      if (!category) {
        return response.status(400).json({ message: 'Contact not found' });
      }
      return response.status(200).json(category);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  async store(request, response) {
    try {
      const { name } = request.body;
      if (!name) {
        return response.status(400).json({ message: 'This name is already in use.'})
      }


      const categoryExists = await CategoryRepository.findByName(name);

      if (categoryExists) {
        return response.status(400).json({ message: 'Contact not exists' });
      }
      const newCategory = await CategoryRepository.create(name);
      return response.status(201).json(newCategory);
    } catch (error) {
      return response.status(404).json({ message: error.message });
    }
  }

  async update(request, response) {
    try {
      const { id } = request.params;
      const { name } = request.body;

      const findCategoryById = await CategoryRepository.findById(id);

      if (!findCategoryById) {
        return response.status(400).json({ message: 'This id is not exists' });
      }

      const findCategoryByName = await CategoryRepository.findByName(name);

      if (findCategoryByName && findCategoryById.id !== id) {
        return response.status(400).json({ message: 'This name is already in use' });
      }


      const updateContact = await CategoryRepository.update(id, { name });
      return response.status(200).json(updateContact);
    } catch (error) {
      return response.status(error.status).json({ message: error.message });
    }
  }

  async delete(request, response) {
    try {
      const { id } = request.params;
      if (!id) {
        return response.status(400).message({ error: 'This id does not exists' });
      }
      const categoryExists = await CategoryRepository.findById(id);
      if (!categoryExists) {
        return response.status(400).message({ error: 'This Ressource does not exists' });
      }
      await CategoryRepository.delete(id);
      return response.status(204).json({ success: true });
    } catch (error) {
      return response.status(error.status).json(error.message);
    }
  }
}

module.exports = new CategoryController();
