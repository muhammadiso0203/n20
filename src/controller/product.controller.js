import { errorRes, successRes } from "../utils/index.js";
import { connection } from "../config/index.js";

export class ProductController {
  async createProduct(req, res) {
    try {
      const { name, price, category_id } = req.body;

      if (!name || !price || !category_id) {
        return errorRes(res, 400, `All data is required`);
      }

      const result = await connection.query(
        `insert into product (name,price,category_id) values ($1,$2,$3) returning *`,
        [name, price, category_id]
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Created data not found`);
      }

      return successRes(res, 201, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async getAllProduct(__, res) {
    try {
      const result = await connection.query(`select * from product`);

      return successRes(res, 200, `success`, result.rows);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async getProductById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const result = await connection.query(
        `select * from product where product_id = $1`,
        [id]
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Product with ID ${id} not found`);
      }

      return successRes(res, 200, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async updateProductById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const body = req.body;

      if (!body.name && !body.price && !body.category_id) {
        return errorRes(res, 400, `At least one data is required`);
      }

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), id];

      const result = await connection.query(
        `update product set ${fields} where product_id = $${values.length} returning *`,
        values
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Product with ID ${id} not found`);
      }

      return successRes(res, 200, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async deleteProductById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const result = await connection.query(
        `delete from product where product_id = $1 returning *`,
        [id]
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Product with ID ${id} not found`);
      }

      return successRes(res, 200, `success`);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }
}
