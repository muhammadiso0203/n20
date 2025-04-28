import { Post } from "../models/index.js";
import { catchError, postValidator } from "../utils/index.js";

export class PostController {
  async createPost(req, res) {
    try {
      const { error, value } = postValidator(req.body);

      if (error) {
        return catchError(res, 400, `Error in creating post`);
      }

      const { title, content, user_id } = value;

      const newPost = await Post.create({ title, content, user_id });

      return res
        .status(201)
        .json({ statusCode: 201, message: "success", data: newPost });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async getAllPosts(__, res) {
    try {
      const allPosts = await Post.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: allPosts });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async getPostById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return catchError(res, 400, `ID not found`);
      }
      const post = await Post.findById(id);

      if (!post) {
        return catchError(res, 404, `Post not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: post });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async updatePostById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return catchError(res, 400, `ID not found`);
      }

      const post = await Post.findById(id);

      if (!post) {
        return catchError(res, 404, `Post not found`);
      }

      const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: updatedPost });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }

  async deletePostById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        return catchError(res, 400, `ID not found`);
      }

      const post = await Post.findById(id);

      if (!post) {
        return catchError(res, 404, `Post not found`);
      }

      await Post.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: {} });
    } catch (error) {
      return catchError(res, 500, `Internal server error`);
    }
  }
}
