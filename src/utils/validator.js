import j from "joi";

// User validator
const user = new j.object({
  username: j.string().min(5).max(20).required(),
  email: j.string().email().required(),
  password: j.string().min(5).max(20).required(),
  role: j.valid("user").optional()
});

export const userValidator = (data) => {
  return user.validate(data);
};

const admin = new j.object({
  username: j.string().min(5).max(20).required(),
  email: j.string().email().required(),
  password: j.string().min(5).max(20).required(),
  role: j.string().valid("admin", "superadmin").default("admin"),
});

export const adminValidator = (data) => {
  return admin.validate(data);
};

// Post validator
const post = new j.object({
  title: j.string().min(5).max(20).required(),
  content: j.string().min(5).required(),
  user_id: j.string().required(),
});

export const postValidator = (data) => {
  return post.validate(data);
};

// Comment validator
const comment = new j.object({
  post_id: j.string().required(),
  user_id: j.string().required(),
  content: j.string().required(),
});

export const commentValidator = (data) => {
  return comment.validate(data);
};
