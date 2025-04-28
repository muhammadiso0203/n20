import { User } from "../models/userModel.js";
import {
  catchError,
  decode,
  encode,
  generateToken,
  userValidator,
  cookie,
  cache,
  sendMail,
  otpGenerator,
} from "../utils/index.js";

export class UserController {
  async signUpUser(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        return catchError(res, 400, `Error in signing up user`);
      }

      const { username, email, password } = value;

      const existing = await User.findOne({ username });

      if (existing) {
        return catchError(res, 409, `User already exists`);
      }

      const decodedPassword = await decode(password);

      const newUser = new User({
        username,
        email,
        decodedPassword,
        role: "user",
      });
      await newUser.save();

      return res.status(201).json({
        statusCode: 201,
        message: "success",
        user: {
          username,
          email,
        },
      });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async signInUser(req, res) {
    try {
      const { email, password } = req.body;

      const existing = await User.findOne({ email });

      if (!existing) {
        return catchError(res, 401, `User not found`);
      }

      const encodedPassword = await encode(password, existing.decodedPassword);

      if (!encodedPassword) {
        return catchError(res, 400, `Error in encoding password`);
      }

      const otp = otpGenerator();
      sendMail(email, "Otp sent", otp);
      cache.setCache(existing.username, otp);

      return res.status(200).json({
        statusCode: 200,
        message: "OTP sent",
      });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }
}
