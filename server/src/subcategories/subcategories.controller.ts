import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { AddSubCategoryDto } from './dto/subcategory.dto';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Get('/get-all')
  getSubCategories() {
    return this.subcategoriesService.getSubCategories();
  }

  @Post('add-subcategory')
  addSubCategory(@Body() addCategoryData: AddSubCategoryDto) {
    return this.subcategoriesService.addSubCategory(addCategoryData);
  }

  @Delete('delete-subcategory')
  async removeSubCategory(@Query('subcategoryId') categoryId: string) {
    const id = parseInt(categoryId, 10);

    if (isNaN(id)) {
      return { message: 'Invalid product ID', status: HttpStatus.BAD_REQUEST };
    }

    return this.subcategoriesService.removeSubCategory(id);
  }
}
