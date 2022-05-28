import fs from 'fs';
import { parse } from 'csv-parse';
import { CategoriesRepository } from '../../../repositories/categories/CategoriesRepository';

interface IImportCategory {
  name: string;
  description: string;
}
class ImportCategoryUseCase {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
    return await new Promise((resolve, reject) => {
      const stream = fs.createReadStream(file.path);
      const categories: IImportCategory[] = [];

      const parsedFile = parse();

      stream.pipe(parsedFile);

      parsedFile
        .on('data', (line) => {
          const [name, description] = line;
          categories.push({ name, description });
        })
        .on('end', () => {
          void fs.promises.unlink(file.path);
          resolve(categories);
        })
        .on('error', (error) => {
          reject(error);
        });

      return categories;
    });
  }

  async execute(file: Express.Multer.File | undefined): Promise<void> {
    if (!file) {
      throw new Error('File not found!');
    }

    const categories = await this.loadCategories(file);

    categories.map(async (category) => {
      const { name, description } = category;

      const existCategory = this.categoriesRepository.findByName(name);

      if (!existCategory) {
        this.categoriesRepository.create({
          name,
          description,
        });
      }
    });
  }
}

export { ImportCategoryUseCase };
