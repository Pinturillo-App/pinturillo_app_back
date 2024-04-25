import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { BAD_REQUEST_STATUS, CREATED_STATUS, NOT_FOUND_STATUS, OK_STATUS } from "../utilities/status.utility";
import { categoryCreateSchema } from "../dto/category/create-category.dto";
import { categoryUpdateSchema } from "../dto/category/update-category.dto";

export class CategoryController {

    private categoryService: CategoryService;

    constructor() {
        this.categoryService = new CategoryService();
    }

    public getCategoryById = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const category = await this.categoryService.getCategoryById(+id);
            return res.status(OK_STATUS).json( category );
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public getAllCategories = async (req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            return res.status(OK_STATUS).json( categories );
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public createCategory = async (req: Request, res: Response) => {
        const category = req.body;
        try {
            await this.categoryService.createCategory(category);
            return res.status(CREATED_STATUS).json( category );
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public updateCategory = async (req: Request, res: Response) => {
        const category = req.body;
        try {
            await this.categoryService.updateCategory( category );
            return res.status(OK_STATUS).json( category );
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }

    public deleteCategory = async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            await this.categoryService.deleteCategory(+id);
            return res.status(OK_STATUS).json({ message: 'Category deleted successfully' });
        } catch (error) {
            return res.status(BAD_REQUEST_STATUS).json({ error: error.message });
        }
    }
}
