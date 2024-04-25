import express from "express";
import { CategoryController } from "../controllers/category.controller";


const categoryRouter = express.Router();
const categoryController = new CategoryController();

categoryRouter.get("/getAllCategories", categoryController.getAllCategories);
categoryRouter.get("/getCategoryById/:id", categoryController.getCategoryById);
categoryRouter.post("/createCategory", categoryController.createCategory);
categoryRouter.put("/updateCategory", categoryController.updateCategory);
categoryRouter.delete("/deleteCategory/:id", categoryController.deleteCategory);

export default categoryRouter;