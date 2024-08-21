import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { AddSubCategoryDto } from './dto/subcategory.dto';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  getSubCategories() {
    try {
      return this.prisma.subCategories.findMany({});
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addSubCategory(categoryData: AddSubCategoryDto) {
    try {
      const { name, categoriesId } = categoryData;

      // Check if the subcategory already exists
      const existingSubCategory = await this.prisma.subCategories.findFirst({
        where: { name },
      });

      if (existingSubCategory) {
        return {
          message: 'Subcategory already exists!',
          status: HttpStatus.FORBIDDEN,
        };
      }

      // Validate categoriesId
      if (!Array.isArray(categoriesId) || categoriesId.length === 0) {
        return {
          message: 'You must provide at least one category ID!',
          status: HttpStatus.BAD_REQUEST,
        };
      }

      // Validate each category ID
      for (const categoryId of categoriesId) {
        const existingCategory = await this.prisma.categories.findUnique({
          where: { id: categoryId },
        });

        if (!existingCategory) {
          return {
            message: `Category with ID ${categoryId} does not exist!`,
            status: HttpStatus.BAD_REQUEST,
          };
        }
      }

      // Create the subcategory and link it to the first category
      const newSubCategory = await this.prisma.subCategories.create({
        data: {
          name,
          categories: {
            connect: { id: categoriesId[0] },
          },
        },
      });

      // Link the subcategory to the remaining categories, if any
      for (let i = 1; i < categoriesId.length; i++) {
        await this.prisma.subCategories.update({
          where: { id: newSubCategory.id },
          data: {
            categories: {
              connect: { id: categoriesId[i] },
            },
          },
        });
      }

      return {
        message: 'Subcategory created and linked successfully',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeSubCategory(id: number) {
    try {
      const cateoryExist = await this.prisma.subCategories.findUnique({
        where: { id },
      });

      if (!cateoryExist) {
        return {
          message: 'Sub Category does not exist ☹',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.subCategories.delete({
        where: { id },
      });

      return {
        message: 'Sub Category removed successfully 😊',
        status: HttpStatus.OK,
      };
    } catch (error) {
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
}
