import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDTO } from './DTO/createBrand.dto';
import { UpdateBrandDTO } from './DTO/updateBrand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async createBrand(@Body() brand: CreateBrandDTO) {
    const newBrand = await this.brandService.addBrand(brand);
    return {
      success: true,
      message: `Created ${newBrand.name} Successfully`,
      data: newBrand,
    };
  }

  @Patch(':brand_id')
  async updateBrand(
    @Param('brand_id') id: string,
    @Body() brand: UpdateBrandDTO,
  ) {
    const updatedBrand = await this.brandService.updateBrand(id, brand);
    return {
      success: true,
      message: `Updated ${updatedBrand.name} Successfully`,
      data: updatedBrand,
    };
  }

  @Delete(':brand_id')
  async deleteBrand(@Param('brand_id') id: string) {
    await this.brandService.deleteBrand(id);
    return {
      success: true,
      message: `Deleted Brnad Successfully`,
      data: null,
    };
  }

  @Get(':brand_id')
  async getBrand(@Param('brand_id') id: string) {
    const brand = await this.brandService.viewBrand(id);
    return {
      success: true,
      message: `Brand ${brand.name} loaded successfully`,
      data: brand,
    };
  }

  @Get()
  async getAllBrands() {
    const allBrands = await this.brandService.viewAllBrands();
    return {
      success: true,
      message: `All Brands loaded successfully`,
      data: allBrands,
    };
  }
}
