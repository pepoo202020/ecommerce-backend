import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDTO } from './DTOS/CreateCategory.dto';
import { UpdateCategoryDTO } from './DTOS/UpdateCategory.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDTO) {
    const newCategory =
      await this.categoriesService.addCategory(createCategoryDto);
    return {
      success: true,
      message: `Category with the name ${newCategory.name} created Successfully`,
      data: newCategory,
    };
  }

  @Patch(':category_id')
  async updateCategory(
    @Param('category_id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDTO,
  ) {
    const updatedCategory = await this.categoriesService.updateCategory(
      id,
      updateCategoryDto,
    );
    return {
      success: true,
      message: `Category with the name ${updatedCategory.name} updated Successfully`,
      data: updatedCategory,
    };
  }

  @Delete(':category_id')
  async deleteCategory(@Param('category_id') id: string) {
    await this.categoriesService.deleteCategory(id);
    return {
      success: true,
      message: 'Category deleted successfully',
      data: null,
    };
  }

  @Get()
  async getAllCategories() {
    const categories = await this.categoriesService.getAllCategories();
    return {
      success: true,
      message: 'All Categories getted successfully',
      data: categories,
    };
  }

  @Get(':category_id')
  async getCategory(@Param('category_id') id: string) {
    const category = await this.categoriesService.getCategory(id);

    return {
      success: true,
      message: `Category with the id ${category.category.name} getted successfully`,
      data: category,
    };
  }
}
