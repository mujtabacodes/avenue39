import NotFound from '@/app/not-found';
import CategoryProducts from '@/components/Category/CategoryProducts';
import SingleProduct from '@/components/Product/SingleProduct';
import SubCategoryProducts from '@/components/SubCategory/SubCategoryProducts';
import { generateSlug } from '@/config';
import {
  fetchCategories,
  fetchProducts,
  fetchSubCategories,
} from '@/config/fetch';
import { re_Calling_products } from '@/data/Re_call_prod';
import { Metadata } from 'next';
import { headers } from 'next/headers';
import React from 'react';

interface SlugPageProps {
  params: Promise<{
    slug: string[];
  }>;
}

const Meta_handler = async (categoryName: string, url: string) => {
  const categories = await fetchCategories();

  const findCategory =
    categories &&
    categories?.find((item: any) => generateSlug(item.name) === categoryName);
  let fullurl = `${url}${findCategory.name}`;

  let images = findCategory.hoverImageUrl || 'images';
  let alttext = findCategory.Images_Alt_Text || 'Alternative Text';
  let NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  let title = findCategory?.Meta_Title || 'Avenue39';
  let description =
    findCategory?.Meta_Description || 'Welcome to blindsandcurtains';
  let canonical = findCategory?.Canonical_Tag;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    alternates: {
      canonical: canonical || fullurl,
    },
  };
};

const productsFindHandler = async (
  slug: string[],
  url: string,
  subcategory?: string,
) => {
  const productName = slug[2];
  const products = await fetchProducts();

  const findProduct = products.find((item: any) => {
    return (
      generateSlug(item.name) === (subcategory ? subcategory : productName)
    );
  });

  if (!findProduct) {
    return <NotFound />;
  }

  let fullurl = `${url}${findProduct?.name}`;

  let images = findProduct.posterImageUrl || 'images';
  let alttext = findProduct.posterImageAltText || 'Alternative Text';
  let NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  let title = findProduct?.Meta_Title || 'Avenue39';
  let description = findProduct?.Meta_Description || 'Welcome to Avenue39';
  let canonical = findProduct?.Canonical_Tag;
  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    alternates: {
      canonical: canonical || fullurl,
    },
  };
};

const subCategory = async (slug: string[], url: string) => {
  let subcategoryName = slug[1];
  let category = slug[0];
  const subCategories = await fetchSubCategories();
  const SubCategoriesFinder = re_Calling_products.find(
    (value) =>
      generateSlug(value.mainCategory).trim().toLocaleLowerCase() ===
        category &&
      generateSlug(value.subCategory).trim().toLocaleLowerCase() ==
        subcategoryName,
  );

  if (SubCategoriesFinder) {
    subcategoryName = generateSlug(
      SubCategoriesFinder.redirectsubCat.trim().toLocaleLowerCase(),
    );
    category = generateSlug(
      SubCategoriesFinder.redirect_main_cat.trim().toLocaleLowerCase(),
    );
  }
  const findSubCategory: any = subCategories?.find((item: any) => {
    const isNameMatch = generateSlug(item.name) === subcategoryName;
    const belongsToCategory = item.categories.some(
      (value: any) =>
        generateSlug(value.name).trim().toLocaleLowerCase() === category,
    );
    return isNameMatch && belongsToCategory;
  });

  if (!findSubCategory) {
    return productsFindHandler(slug, url, subcategoryName);
  }
  let fullurl = `${url}${findSubCategory?.name}`;

  let images = findSubCategory.hoverImageUrl || 'images';
  let alttext = findSubCategory.Images_Alt_Text || 'Alternative Text';
  let NewImage = [
    {
      url: images,
      alt: alttext,
    },
  ];

  let title = findSubCategory?.meta_title || 'Avenue39';
  let description =
    findSubCategory?.meta_description || 'Welcome to blindsandcurtains';
  let canonical = findSubCategory?.canonical_tag;

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: fullurl,
      images: NewImage,
    },
    alternates: {
      canonical: canonical || fullurl,
    },
  };
};

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  let metaObject: any;

  const headersList = await headers();
  const domain =
    headersList.get('x-forwarded-host') || headersList.get('host') || '';
  const protocol = headersList.get('x-forwarded-proto') || 'https';
  const pathname = headersList.get('x-invoke-path') || '/';

  const fullUrl = `${protocol}://${domain}${pathname}`;
  if (slug.length === 1) {
    metaObject = await Meta_handler(slug[0], fullUrl);
  } else if (slug.length === 2) {
    metaObject = await subCategory(slug, fullUrl);
  } else if (slug.length === 3) {
    metaObject = await productsFindHandler(slug, fullUrl);
  }

  return metaObject;
}

const SlugPage: React.FC<SlugPageProps> = async ({ params }) => {
  const { slug } = await params;

  if (slug.length === 1) {
    return <CategoryProducts slug={slug} />;
  } else if (slug.length === 2) {
    return <SubCategoryProducts slug={slug} />;
  } else if (slug.length === 3) {
    return <SingleProduct slug={slug} />;
  }
  return <NotFound />;
};

export default SlugPage;
