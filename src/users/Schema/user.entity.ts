import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Post } from 'src/posts/Schema/post.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true })
  email: string;

  @Prop({ type: Types.ObjectId, ref: 'Post' })
  post_id: Post;
  static schema: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
