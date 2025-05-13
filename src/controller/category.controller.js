import { errorRes, successRes } from "../utils/index.js";
import { connection } from "../config/index.js";

export class CategoryController {
  async createCategory(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        return errorRes(res, 400, `All data is required`);
      }

      const result = await connection.query(
        `insert into category (name) values ($1) returning *`,
        [name]
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Created data not found`);
      }

      return successRes(res, 201, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async getAllCategory(__, res) {
    try {
      const result = await connection.query(`select * from category`);

      return successRes(res, 200, `success`, result.rows);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const result = await connection.query(
        `select * from category where category_id = $1`,
        [id]
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Category with ID ${id} not found`);
      }

      return successRes(res, 200, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async updateCategoryById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const body = req.body;

      if (!body.name) {
        return errorRes(res, 400, `At least one data is required`);
      }

      const keys = Object.keys(body);
      const fields = keys.map((key, i) => `${key} = $${i + 1}`).join(", ");
      const values = [...Object.values(body), id];

      const result = await connection.query(
        `update category set ${fields} where category_id = $${values.length} returning *`,
        values
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Category with ID ${id} not found`);
      }

      return successRes(res, 200, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }

  async deleteCategoryById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const result = await connection.query(
        `delete from category where category_id = $1 returning *`,
        [id]
      );

      if (result.rowCount === 0) {
        return errorRes(res, 404, `Category with ID ${id} not found`);
      }

      return successRes(res, 200, `success`);
    } catch (err) {
      return errorRes(res, 500, err.message);
    }
  }
}
