import { User } from "../models/userModel.js";
import { catchError, decode, encode, userValidator } from "../utils/index.js";

export class UserController {
  async signUpUser(req, res) {
    try {
      const { error, value } = userValidator(req.body);
      if (error) {
        throw new Error("Error in signing up user:", error.message);
      }

      const { username, email, password } = value;

      const existing = await User.findOne({ username });

      if (existing) {
        throw new Error("User already exists");
      }

      const decodedPassword = await decode(password);

      const newUser = new User({
        username,
        email,
        decodedPassword,
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
      catchError(error, res);
    }
  }

  async signInUser(req, res) {
    try {
      const { email, password } = req.body;

      const existing = await User.findOne({ email });

      if (!existing) {
        throw new Error("User not found");
      }

      const encodedPassword = await encode(password, existing.decodedPassword);

      if (!encodedPassword) {
        throw new Error("Error in encoding user password");
      }

      return res.status(200).json({
        statusCode: 200,
        message: "success",
        user: existing,
      });
    } catch (error) {
      catchError(error, res);
    }
  }
}
