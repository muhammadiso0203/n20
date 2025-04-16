import { User } from "../models/index.js";

export const authController = {
  signUp: async (req, res, next) => {
    try {
      const body = req.body;
      const user = await User.findOne(
        { email: body.email },
        "email _id"
      ).exec();

      if (user) {
        return res.send("User already exists!;");
      }

      const newUser = new User(body);

      await newUser.save();
      res.status(201).send(newUser);
    } catch (err) {
      next(err);
    }
  },
  signIn: async (req, res, next) => {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) return res.status(404).json({ message: "User not found" });

      const isMatch = await user.isValidPassword(password);

      if (!isMatch)
        return res.status(401).json({ message: `Invalid credentials` });

      res.json(user);
    } catch (err) {
      next(err);
    }
  },

  profile:(req,res,next)=>{
    try {
      res.json(req.user)
    } catch (error) {
      next(error)
    }
  }
};
