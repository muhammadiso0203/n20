import { Comment } from "../models/index.js";
import { catchError, commentValidator } from "../utils/index.js";

export class CommentController {
  async createComment(req, res) {
    try {
      const { error, value } = commentValidator(req.body);

      if (error) {
        throw new Error(`Error in creating comment: ${error.message}`);
      }

      const { post_id, user_id, content } = value;

      const newComment = await Comment.create({ post_id, user_id, content });

      return res
        .status(201)
        .json({ statusCode: 201, message: "success", data: newComment });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getAllComments(__, res) {
    try {
      const allComments = await Comment.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: allComments });
    } catch (error) {
      catchError(error, res);
    }
  }

  async getCommentById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID not found");
      }
      const comment = await Comment.findById(id);

      if (!comment) {
        throw new Error(`Comment not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: comment });
    } catch (error) {
      catchError(error, res);
    }
  }

  async updateCommentById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID not found");
      }

      const comment = await Comment.findById(id);

      if (!comment) {
        throw new Error(`Comment not found`);
      }

      const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: updatedComment });
    } catch (error) {
      catchError(error, res);
    }
  }

  async deleteCommentById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        throw new Error("ID not found");
      }

      const comment = await Comment.findById(id);

      if (!comment) {
        throw new Error(`Comment not found`);
      }

      await Comment.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: {} });
    } catch (error) {
      catchError(error, res);
    }
  }
}
