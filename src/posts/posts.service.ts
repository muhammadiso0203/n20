import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './schemas/post.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { errorCatch } from '../utils/error-catch';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private model: Model<Post>) {}
  async create(createPostDto: CreatePostDto) {
    try {
      const newPost = await this.model.create(createPostDto);
      return {
        statusCode: 201,
        message: 'success',
        data: newPost,
      };
    } catch (e) {
      return errorCatch(e);
    }
  }

  async findAll() {
    try {
      const posts = await this.model.find().populate('userId');
      return {
        statusCode: 200,
        message: 'success',
        data: posts,
      };
    } catch (e) {
      return errorCatch(e);
    }
  }

  async findOne(id: string) {
    const post = await this.model.findById(id).populate('userId');
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found `);
    }

    return {
      statusCode: 200,
      message: 'success',
      data: post,
    };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.model.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found `);
    }

    const updatedPost = await this.model.findByIdAndUpdate(id, updatePostDto, {
      new: true,
      runValidators: true,
    });

    return {
      statusCode: 200,
      message: 'success',
      updatedPost,
    };
  }

  async remove(id: string) {
    const post = await this.model.findById(id);
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found `);
    }

    await this.model.findByIdAndDelete(id);
    return {
      statusCode: 200,
      message: 'success',
      data: {},
    };
  }
}
