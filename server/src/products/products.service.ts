import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { customHttpException } from '../utils/helper';
import { AddProductDto, UpdateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  getProducts() {
    try {
      console.log(this.prisma.products.findMany({}));
      return this.prisma.products.findMany({
        include: {
          categories: {
            include: {
              subcategories: true,
            },
          },
          subcategories: true,
        },
      });
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }

  async addProduct(productData: AddProductDto) {
    console.log('Add product triggered');
    console.log(productData);
    try {
      const existingProduct = await this.prisma.products.findFirst({
        where: { name: productData.name },
      });

      if (existingProduct) {
        return {
          message: 'Product with this name already exists!',
          status: HttpStatus.FORBIDDEN,
        };
      }

      await this.prisma.products.create({
        data: {
          ...productData,
          name: productData.name,
          price: productData.price,
          description: productData.description,
          stock: productData.stock,
          discountPrice: productData.discountPrice ?? null,
          posterImageUrl: productData.posterImageUrl,
          posterImagePublicId: productData.posterImagePublicId,
          hoverImageUrl: productData.hoverImageUrl ?? null,
          hoverImagePublicId: productData.hoverImagePublicId ?? null,
          productImages: productData.productImages ?? [],
          additionalInformation: productData.additionalInformation ?? [],
          colors: productData.colors ?? [],
          spacification: productData.spacification ?? [],
          categories: {
            connect: productData.categories.map((id) => ({ id })),
          },
          subcategories: {
            connect: productData.subcategories.map((id) => ({ id })),
          },
        },
      });

      return {
        message: 'Product created successfully 🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
  async updateProduct(productData: UpdateProductDto) {
    console.log('Update product triggered');
    console.log(productData);
    try {
      const existingProduct: any = await this.prisma.products.findFirst({
        where: { id: productData.id },
      });
      const { id,imagesUrl,...Data } = productData;

      if (!existingProduct) {
        return {
          message: 'Product not found☹',
          status: HttpStatus.FORBIDDEN,
        };
      }

      const colors =
        productData.colors?.map(
          (color: { colorName: string }) => color.colorName,
        ) ?? [];

      await this.prisma.products.update({
        where: { id: productData.id },
        data: {
          ...Data,
          // name: productData.name ?? existingProduct.name,

          // hoverImageAltText:
          //   productData.hoverImageAltText ?? existingProduct.hoverImageAltText,
          // Images_Alt_Text:
          //   productData.Images_Alt_Text ?? existingProduct.Images_Alt_Text,
          // posterImageAltText:
          //   productData.posterImageAltText ??
          //   existingProduct.posterImageAltText,
          // Meta_Title: productData.Meta_Title ?? existingProduct.Meta_Title,
          // Meta_Description:
          //   productData.Meta_Description ?? existingProduct.Meta_Description,
          // Og_title: productData.Og_title ?? existingProduct.Og_title,
          // Og_Image: productData.Og_Image ?? existingProduct.Og_Image,
          // Og_Url: productData.Og_Url ?? existingProduct.Og_Url,
          // description: productData.description ?? existingProduct.description,
          // stock: productData.stock ?? existingProduct.stock,
          // discountPrice:
          //   productData.discountPrice ?? existingProduct.discountPrice ?? null,
          // posterImageUrl:
          //   productData.posterImageUrl ?? existingProduct.posterImageUrl,
          // posterImagePublicId:
          //   productData.posterImagePublicId ??
          //   existingProduct.posterImagePublicId,
          // hoverImageUrl:
          //   productData.hoverImageUrl ?? existingProduct.hoverImageUrl ?? null,
          // hoverImagePublicId:
          //   productData.hoverImagePublicId ??
          //   existingProduct.hoverImagePublicId ??
          //   null,
          // productImages:
          //   productData.productImages ?? existingProduct.productImages ?? [],
          // additionalInformation:
          //   productData.additionalInformation ??
          //   existingProduct.additionalInformation ??
          //   [],
          colors: colors ?? existingProduct.colors ?? [],
          // spacification:
          //   productData.spacification ?? existingProduct.spacification ?? [],
          // sections: productData.sections ?? existingProduct.sections ?? [],
          // sale_counter:
          //   productData.sale_counter ?? existingProduct.sale_counter ?? [],
          //   Canonical_Tag:
          //   productData.Canonical_Tag ?? existingProduct.Canonical_Tag ?? null,

          categories: {
            set: productData.categories?.map((id) => ({ id })) ?? [],
          },
          subcategories: {
            set: productData.subcategories?.map((id) => ({ id })) ?? [],
          },
        },
      });

      return {
        message: 'Product updated successfully 🎉',
        status: HttpStatus.OK,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeProduct(id: number) {
    try {
      const productExist = await this.prisma.products.findUnique({
        where: { id },
      });

      if (!productExist) {
        return {
          message: 'Product does not exist ☹',
          status: HttpStatus.NOT_FOUND,
        };
      }

      await this.prisma.products.delete({
        where: { id },
      });

      return {
        message: 'Product removed successfully 😊',
        status: HttpStatus.OK,
      };
    } catch (error) {
      console.error('Error removing product:', error);
      customHttpException(error.message, 'BAD_REQUEST');
    }
  }
}
