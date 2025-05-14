import { db } from "../config/index.js";
import { errorRes, successRes } from "../utils/index.js";

export class ArticleController {
  async createArticle(req, res) {
    try {
      const { user_id, title, content } = req.body;

      const notExistsUserId = await db.query(
        `select * from users where user_id = $1`,
        [user_id]
      );

      if (notExistsUserId.rowCount === 0) {
        return errorRes(
          res,
          500,
          `Insert or update table violates foreign key constraint`
        );
      }
      const result = await db.query(
        `insert into articles (user_id,title,content) values($1,$2,$3) returning *`,
        [user_id, title, content]
      );

      return result.rowCount === 0
        ? errorRes(res, 500, `Created article not found`)
        : successRes(res, 201, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }

  async getArticleByUserId(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return errorRes(res, 400, `ID not found`);
      }

      const result = await db.query(
        `select * from articles where user_id = $1`,
        [id]
      );

      return result.rowCount === 0
        ? errorRes(res, 404, `Article with user_id ${id} not found`)
        : successRes(res, 200, `success`, result.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }
}
