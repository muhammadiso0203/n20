import { Comment } from "../models/index.js";
import { catchError, commentValidator } from "../utils/index.js";

export class CommentController {
  async createComment(req, res) {
    try {
      const { error, value } = commentValidator(req.body);

      if (error) {
        catchError(res, 400, `Error in creating comment`);
      }

      const { post_id, user_id, content } = value;

      const newComment = await Comment.create({ post_id, user_id, content });

      return res
        .status(201)
        .json({ statusCode: 201, message: "success", data: newComment });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async getAllComments(__, res) {
    try {
      const allComments = await Comment.find();

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: allComments });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async getCommentById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        catchError(res, 400, `ID not found`);
      }
      const comment = await Comment.findById(id);

      if (!comment) {
        catchError(res, 404, `Comment not found`);
      }

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: comment });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async updateCommentById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        catchError(res, 400, `ID not found`);
      }

      const comment = await Comment.findById(id);

      if (!comment) {
        catchError(res, 404, `Comment not found`);
      }

      const updatedComment = await Comment.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: updatedComment });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }

  async deleteCommentById(req, res) {
    try {
      const id = req.params.id;

      if (!id) {
        catchError(res, 400, `ID not found`);
      }

      const comment = await Comment.findById(id);

      if (!comment) {
        catchError(res, 404, `Comment not found`);
      }

      await Comment.findByIdAndDelete(id);
      return res
        .status(200)
        .json({ statusCode: 200, message: "success", data: {} });
    } catch (error) {
      catchError(res, 500, `Internal server error`);
    }
  }
}
