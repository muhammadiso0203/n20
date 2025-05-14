import { db } from "../config/index.js";
import { errorRes, successRes } from "../utils/index.js";

export class UserController {
  async registerUser(req, res) {
    try {
      const { name, email } = req.body;

      if (!name || !email) {
        return errorRes(res, 400, `All data is required`);
      }

      const existsUser = await db.query(
        `select * from users where email = $1`,
        [email]
      );

      if (existsUser.rowCount === 1) {
        return errorRes(res, 409, `User already exists`);
      }

      const createdUser = await db.query(
        `insert into users (name,email) values($1,$2) returning *`,
        [name, email]
      );

      if (createdUser.rowCount === 0) {
        return errorRes(res, 500, `Created user not found`);
      }

      const user_id = createdUser.rows[0].user_id;
      const { client, os, device_logs, row_user_agent } = req.device;
      const createdDevicelog = await db.query(
        `insert into device_logs (user_id,client,os,device_logs,row_user_agent) values ($1,$2,$3,$4,$5) returning *`,
        [user_id, client, os, device_logs, row_user_agent]
      );

      if (createdDevicelog.rowCount === 0) {
        return errorRes(res, 500, `Created device log not found`);
      }

      return successRes(res, 201, `success`, createdUser.rows[0]);
    } catch (err) {
      return errorRes(res, 500, err.message, err.type);
    }
  }
}
