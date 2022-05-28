import { Request, Response, Router } from 'express';
import multer from 'multer';

import { createCategoryController } from '../modules/cars/useCases/categories/createCategory';
import { importCategoryController } from '../modules/cars/useCases/categories/importCategory';
import { listCategoriesController } from '../modules/cars/useCases/categories/listCategories';

const categoriesRoutes = Router();

const upload = multer({ dest: './tmp' });

categoriesRoutes.post('/', (request: Request, response: Response): Response => {
  return createCategoryController.handle(request, response);
});

categoriesRoutes.get('/', (request: Request, response: Response): Response => {
  return listCategoriesController.handle(request, response);
});

categoriesRoutes.post('/import', upload.single('file'), (request: Request, response: Response): Response => {
  return importCategoryController.handle(request, response);
});

export { categoriesRoutes };
