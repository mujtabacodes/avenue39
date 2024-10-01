import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsArray,
  IsInt,
  ArrayNotEmpty,
} from 'class-validator';
export class AddSubCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayNotEmpty()
  @IsInt({ each: true })
  categoriesId: number[];

  posterImageUrl;
}
export class UpdateSubCategoryDto extends AddSubCategoryDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
