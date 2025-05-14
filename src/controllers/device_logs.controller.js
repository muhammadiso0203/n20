import { db } from "../config/index.js";
import { errorRes, successRes } from "../utils/index.js";

export class DeviceLogController {
  async getDeviceLogByUserId(req, res) {
    const { id } = req.params;

    if (!id) {
      return errorRes(res, 400, `ID not found`);
    }

    const result = await db.query(
      `select * from device_logs where user_id = $1`,
      [id]
    );

    return result.rowCount === 0
      ? errorRes(res, 404, `Device log with user_id ${id} not found`)
      : successRes(res, 200, `success`, result.rows[0]);
  }
  catch(err) {
    return errorRes(res, 500, err.message, err.type);
  }
}
