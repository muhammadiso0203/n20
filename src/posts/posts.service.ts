import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
  constructor(@InjectRepository(Post) private postRepo: Repository<Post>) {}
  async create(createPostDto: CreatePostDto) {
    const newPost = await this.postRepo.save(createPostDto);
    return newPost;
  }

  async findAll() {
    return {
      data: await this.postRepo.find({ relations: ['user'] }),
    };
  }

  async findOne(id: string) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }
    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    await this.postRepo.update(id, updatePostDto);

    const updatedPost = await this.postRepo.findOneBy({ id });
    return updatedPost;
  }

  async remove(id: string) {
    const post = await this.postRepo.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    await this.postRepo.delete(id);
    return {
      message: 'success',
    };
  }
}
