import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true }) //create autmatic created at. updated at
export class Category {
  @Prop({ required: true })
  name: string; // the name of category

  @Prop()
  description: string; // brief description for category

  @Prop({ type: String, ref: 'Category' })
  parent: string; // Reference to another category for nested category

  @Prop({ default: true })
  isActive: boolean; // flag to indecate the category is active or not

  @Prop({ required: true, unique: true })
  slug: string; //url friendly version

  @Prop()
  image: string; // Url for category image

  @Prop({ default: false })
  isFeatured: boolean; // flag for displaying is featured or not

  @Prop({ type: [{ type: String, ref: 'Category' }] })
  children: Category[];
}

export const CategorySchema = SchemaFactory.createForClass(Category);
