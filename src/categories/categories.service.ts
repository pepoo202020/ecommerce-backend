import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from 'src/models/Category.model';
import { CreateCategoryDTO } from './DTOS/CreateCategory.dto';
import { UpdateCategoryDTO } from './DTOS/UpdateCategory.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
  ) {}

  //SECTION -  CATEGORY MANGEMENT
  //TODO -  ADD CATEGPRY ---BY ADMIN
  async addCategory(createCategoryDto: CreateCategoryDTO): Promise<Category> {
    const createdCategory = new this.categoryModel(createCategoryDto);
    // Find the parent category by name
    const parentCategory = await this.categoryModel.findOne({
      name: createCategoryDto.parent,
    });
    if (parentCategory) {
      await this.categoryModel.findByIdAndUpdate(parentCategory._id, {
        $addToSet: {
          children: createdCategory._id,
        },
      });
    }

    return createdCategory.save();
  }

  //TODO - UPDATE CATEGORY --BY ADMIN
  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDTO,
  ): Promise<Category> {
    const category = await this.categoryModel.findById(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }

    // Find the parent category by name
    if (updateCategoryDto.parent) {
      const parentCategory = await this.categoryModel.findOne({
        name: updateCategoryDto.parent,
      });
      if (parentCategory) {
        updateCategoryDto.parent = parentCategory.name; // Set the parent to the found category name
      } else {
        updateCategoryDto.parent = null; // No parent found
      }
    }

    Object.assign(category, updateCategoryDto);
    return category.save();
  }

  //TODO - DELETE CATEGORY --BY ADMIN
  async deleteCategory(id: string): Promise<any> {
    const category = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }

  //SECTION - CATEGORY LISTING
  //TODO - DISPLAY ALL CATEGORIES
  async getAllCategories(): Promise<Category[]> {
    const categories = await this.categoryModel.find();
    // Create a map to store categories by name for quick access
    const categoryMap = new Map<string, any>();
    // Initialize categories in the map
    categories.forEach((category) => {
      categoryMap.set(category.name, { ...category.toObject(), children: [] });
    });
    // Build the hierarchical structure
    const hierarchicalCategories = [];
    categories.forEach((category) => {
      if (category.parent) {
        const parentCategory = categoryMap.get(category.parent);
        if (parentCategory) {
          parentCategory.children.push(categoryMap.get(category.name));
        }
      } else {
        hierarchicalCategories.push(categoryMap.get(category.name));
      }
    });

    return hierarchicalCategories;
  }

  //SECTION - CATEGORY DETAILS
  //TODO - DISPLAY CATEGORY DETAILS
  async getCategory(id: string): Promise<any> {
    const category = await this.categoryModel
      .findById(id)
      .populate('children')
      .exec();
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }
}
