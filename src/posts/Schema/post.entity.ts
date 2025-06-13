import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Post extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;
  static schema: any;
}

export const PostSchema = SchemaFactory.createForClass(Post);

PostSchema.virtual('User', {
  ref: 'User',
  localField: '_id',
  foreignField: 'post_id',
});
