import express from 'express';
import { CategoryController } from '../controllers/category.controller';


export const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.get('/getAllCategories', categoryController.getAllCategories);
categoryRouter.get('/getCategoryById/:id', categoryController.findCategoryById);
categoryRouter.post('/createCategory', categoryController.saveCategory);
categoryRouter.put('/updateCategory', categoryController.updateCategory);
categoryRouter.delete('/deleteCategory/:id', categoryController.deleteCategory);