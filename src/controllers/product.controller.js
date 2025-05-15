import db from "../models/index.js";
import { errorRes, successRes } from "../utils/index.js";

export class ProductController {
  async createProduct(req, res) {
    try {
      const id = req.body.categoryId;
      const existsCategory = await db.Category.findOne({
        where: { id },
      });

      if (!existsCategory) {
        return errorRes(res, 404, `Category with ID ${id} not found`);
      }

      const product = await db.Product.create(req.body);

      return successRes(res, 201, `success`, product);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async findAllProduct(__, res) {
    try {
      const products = await db.Product.findAll({
        include: [
          {
            model: db.Category,
          },
        ],
      });

      return successRes(res, 200, `success`, products);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async findProductById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const product = await db.Product.findOne({
        where: { id },
        include: [
          {
            model: db.Category,
          },
        ],
      });

      if (!product) {
        return errorRes(res, 404, `Product with ID ${id} not found`);
      }

      return successRes(res, 200, `success`, product);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async updateProductById(req, res) {
    try {
      const { id } = req.params;
      const body = req.body;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const [count, updatedRows] = await db.Product.update(body, {
        where: { id },
        returning: true,
      });

      return count === 0
        ? errorRes(res, 404, `Product not found or not updated`)
        : successRes(res, 200, `success`, updatedRows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async deleteProductById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const deletedProduct = await db.Product.destroy({ where: { id } });

      return deletedProduct === 0
        ? errorRes(res, 404, `Product with ID ${id} not found`)
        : successRes(res, 200, `success`);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }
}
