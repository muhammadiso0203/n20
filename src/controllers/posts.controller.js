import { Post } from "../models/index.js";
import { catchError, postValidator } from "../utils/index.js";

export class PostController {
  async createPost(req, res) {
    try {
      const { error, value } = postValidator(req.body);

      if (error) {
        throw new Error(`Error in creating post: ${error.message}`);
      }

      const { title, content, user_id } = value;

      const newPost = await Post.create({ title, content, user_id });

      return res
        .status(201)
        .json({ statusCode: 201, message: "success", data: newPost });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAllPosts(__, res) {
    try {
      const allPosts = await Post.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: allPosts });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getPostById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID not found");
      }
      const post = await Post.findById(id);

      if (!post) {
        throw new Error(`Post not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: post });
    } catch (error) {
      catchError(error, res);
    }
  }

  async updatePostById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID not found");
      }

      const post = await Post.findById(id);

      if (!post) {
        throw new Error(`Post not found`);
      }

      const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: updatedPost });
    } catch (error) {
      catchError(error, res);
    }
  }

  async deletePostById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID not found");
      }

      const post = await Post.findById(id);

      if (!post) {
        throw new Error(`Post not found`);
      }

      await Post.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: {} });
    } catch (error) {
      catchError(error, res);
    }
  }
}
