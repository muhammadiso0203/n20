import { Router } from "express";
import { CategoryController } from "../controllers/category.controller.js";

const router = Router();
const controller = new CategoryController();

router
    .post('/', controller.createCategory)
    .get('/', controller.getAllCategory)
    .patch('/:id', controller.updateCategory)
    .delete('/:id', controller.deleteCategory)

export default router;