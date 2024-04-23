import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { BAD_REQUEST_STATUS, NOT_FOUND_STATUS, OK_STATUS } from "../utilities/status.utility";
import { categoryCreateSchema } from "../dto/category/create-category.dto";
import { categoryUpdateSchema } from "../dto/category/update-category.dto";

export class CategoryController {

    private categoryService: CategoryService = new CategoryService();

    constructor() {
        this.categoryService = new CategoryService();
    }

    public getCategoryById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const category = this.categoryService.getCategoryById(id);
            if (!category) {
                res.status(NOT_FOUND_STATUS).json({ error: 'Category does not exist' });
            }
            res.status(OK_STATUS).json({ category });
        } catch (error) {
            res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public getAllCategories = async (req: Request, res: Response) => {
        try {
            const categories = this.categoryService.getAllCategories();
            return res.status(OK_STATUS).json(categories);
        } catch (error) {
            res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public createCategory = async (req: Request, res: Response) => {
        const { name } = req.body;
        const data = categoryCreateSchema.validate({ name });
    
        if (data.error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: data.error.details[0].message });
        }
    
        try {
            this.categoryService.createCategory(name);
            res.status(OK_STATUS).json({ message: 'Category created successfully' });
        } catch (error) {
            res.status(BAD_REQUEST_STATUS).json({ error: error.message, message: "Malparido" });
        }
    }
s    

    public updateCategory = async (req: Request, res: Response) => {
        const category = req.body;
        const data = categoryUpdateSchema.validate(category);

        if (data.error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: data.error.details[0].message });
        }

        const { id } = req.params;
        const { name } = req.body;

        try {
            this.categoryService.updateCategory(id, name);
            res.status(OK_STATUS).json({ message: 'Category updated successfully' });
        } catch (error) {
            res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public deleteCategory = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            this.categoryService.deleteCategory(id);
            res.status(OK_STATUS).json({ message: 'Category deleted successfully' });
        } catch (error) {
            res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }
}
