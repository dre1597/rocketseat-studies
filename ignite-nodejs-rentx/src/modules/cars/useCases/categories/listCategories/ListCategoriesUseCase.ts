import { Category } from '../../../models/Category';
import { ICategoriesRepository } from '../../../repositories/categories/ICategoriesRepository';

class ListCategoriesUseCase {
  constructor(private readonly categoriesRepository: ICategoriesRepository) {}

  execute(): Category[] {
    const categories = this.categoriesRepository.list();

    return categories;
  }
}

export { ListCategoriesUseCase };
