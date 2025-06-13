import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post } from './Schema/post.entity';

@Injectable()
export class PostsService {
  constructor(@InjectModel('Post') private readonly model: Model<Post>) {}
  async create(createPostDto: CreatePostDto) {
    try {
      const post = new this.model(createPostDto);
      return post.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findAll() {
    try {
      const posts = this.model.find().populate('User');
      return posts;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  findOne(id: number) {
    try {
      const post = this.model.findById(id).populate('User');
      if (!post) {
        throw new InternalServerErrorException('Not found');
      }
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = this.model.findByIdAndUpdate(id, updatePostDto, {
        new: true,
      });
      return post;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  remove(id: number) {
    try {
      this.model.findByIdAndDelete(id);
      return { data: {} };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
