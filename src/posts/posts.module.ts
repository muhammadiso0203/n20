import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Post } from './Schema/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Post.name, schema: Post.schema},

    ]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
