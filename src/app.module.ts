import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://muhammadiso0203:Mrx050607@cluster0.6nqvqby.mongodb.net/n20'),
    UsersModule, PostsModule
  ],
})
export class AppModule {}
