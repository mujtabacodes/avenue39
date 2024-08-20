import { Delete, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddCategoryDto } from './dto/category.dto';
import { customHttpException } from '../utils/helper';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  getCategories() {
    try {
      return this.prisma.categories.findMany({
        include: {
          subcategories: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addCategory(categoryData: AddCategoryDto) {
    console.log(categoryData);
    try {
      const { name } = categoryData;
      const existingCategory = await this.prisma.categories.findFirst({
        where: { name },
      });

      if (existingCategory) {
        return {
          message: 'Already exist!',
          status: HttpStatus.FORBIDDEN,
        };
      }

      await this.prisma.categories.create({
        data: {
          ...categoryData,
          posterImageUrl: categoryData.posterImageUrl.imageUrl ?? null,
          posterImagePublicId: categoryData.posterImageUrl.public_id ?? null,
        },
      });

      return {
        message: 'Category Created successfully🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }

  async removeCategory(id: number) {
    try {
      const cateoryExist = await this.prisma.categories.findUnique({
        where: { id },
      });

      if (!cateoryExist) {
        return {
          message: 'Category does not exist ☹',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.categories.delete({
        where: { id },
      });

      return {
        message: 'Category removed successfully 😊',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
}
