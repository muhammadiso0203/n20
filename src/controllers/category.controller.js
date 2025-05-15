import db from "../models/index.js";
import { errorRes, successRes } from "../utils/index.js";

export class CategoryController {
  async createCategory(req, res) {
    try {
      const category = await db.Category.create(req.body);

      return successRes(res, 201, `success`, category);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async findAllCategory(__, res) {
    try {
      const categories = await db.Category.findAll();
      return successRes(res, 200, `success`, categories);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async findOneCategory(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const category = await db.Category.findOne({
        where: { id },
      });

      if (!category) {
        return errorRes(res, 404, `Category with ID ${id} not found`);
      }

      return successRes(res, 200, `success`, category);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async updateCategoryById(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const [count, updatedRows] = await db.Category.update(body, {
        where: { id },
        returning: true,
      });

      return count === 0
        ? errorRes(res, 404, `Category not found or not updated`)
        : successRes(res, 200, `success`, updatedRows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async deleteCategoryById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const deletedCategory = await db.Category.destroy({ where: { id } });

      return deletedCategory === 0
        ? errorRes(res, 404, `Category with ID ${id} not found`)
        : successRes(res, 200, `success`);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }
}