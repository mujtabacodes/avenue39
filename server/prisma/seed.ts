import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed Categories
  const livingRoomCategory = await prisma.categories.create({
    data: {
      name: 'Living Room',
      posterImageUrl:
        'https://unsplash.com/photos/the-interior-with-leather-sofa-on-empty-white-wall-background3d-rendering-ZXEv4N7xXjg',
      posterImagePublicId: 'living_room_poster_123',
    },
  });

  const bedroomCategory = await prisma.categories.create({
    data: {
      name: 'Bedroom',
      posterImageUrl:
        'https://unsplash.com/photos/throw-pillow-on-bed-frame-iAftdIcgpFc',
      posterImagePublicId: 'bedroom_poster_123',
    },
  });

  // Seed SubCategories
  const sofasSubCategory = await prisma.subCategories.create({
    data: {
      name: 'Sofas',
      posterImageUrl:
        'https://unsplash.com/photos/brown-and-white-wooden-table-beside-sofa-chair-FBXuXp57eM0',
      posterImagePublicId: 'sofas_poster_123',
      categories: {
        connect: [{ id: livingRoomCategory.id }],
      },
    },
  });

  const coffeeTablesSubCategory = await prisma.subCategories.create({
    data: {
      name: 'Coffee Tables',
      posterImageUrl:
        'https://unsplash.com/photos/two-clear-drinking-glasses-on-top-of-brown-wooden-table-1k7TnX5GAww',
      posterImagePublicId: 'coffee_tables_poster_123',
      categories: {
        connect: [{ id: livingRoomCategory.id }],
      },
    },
  });

  const bedsSubCategory = await prisma.subCategories.create({
    data: {
      name: 'Beds',
      categories: {
        connect: [{ id: bedroomCategory.id }],
      },
    },
  });

  const wardrobesSubCategory = await prisma.subCategories.create({
    data: {
      name: 'Wardrobes',
      categories: {
        connect: [{ id: bedroomCategory.id }],
      },
    },
  });

  // Seed Products
  await prisma.products.create({
    data: {
      name: 'Modern Sofa',
      price: 899,
      description:
        'A stylish and comfortable modern sofa for your living room.',
      stock: 20,
      discountPrice: 799,
      sale: '10%',
      saleDuration: new Date(),
      posterImageUrl:
        'https://unsplash.com/photos/brown-and-white-wooden-table-beside-sofa-chair-FBXuXp57eM0',
      posterImagePublicId: 'modern_sofa_poster_123',
      hoverImageUrl:
        'https://unsplash.com/photos/brown-and-white-wooden-table-beside-sofa-chair-FBXuXp57eM0',
      hoverImagePublicId: 'modern_sofa_hover_123',
      productImages: [
        {
          url: 'https://unsplash.com/photos/brown-and-white-wooden-table-beside-sofa-chair-FBXuXp57eM0',
          publicId: 'modern_sofa_img1_123',
        },
        {
          url: 'https://unsplash.com/photos/brown-and-white-wooden-table-beside-sofa-chair-FBXuXp57eM0',
          publicId: 'modern_sofa_img2_123',
        },
      ],
      additionalInformation: [
        { name: 'Material', detail: 'Leather' },
        { name: 'Dimensions', detail: '82"W x 35"H x 36"D' },
      ],
      categories: {
        connect: [{ id: livingRoomCategory.id }],
      },
      subcategories: {
        connect: [{ id: sofasSubCategory.id }],
      },
    },
  });

  await prisma.products.create({
    data: {
      name: 'Wooden Coffee Table',
      price: 199,
      description:
        'A rustic wooden coffee table that adds charm to your living room.',
      stock: 50,
      discountPrice: 179,
      sale: '10%',
      saleDuration: new Date(),
      posterImageUrl:
        'https://unsplash.com/photos/white-ceramic-cup-filled-with-coffee-beside-glass-of-water-ynwSQ9Bd6cA',
      posterImagePublicId: 'wooden_coffee_table_poster_123',
      hoverImageUrl:
        'https://unsplash.com/photos/white-ceramic-cup-filled-with-coffee-beside-glass-of-water-ynwSQ9Bd6cA',
      hoverImagePublicId: 'wooden_coffee_table_hover_123',
      productImages: [
        {
          url: 'https://unsplash.com/photos/white-ceramic-cup-filled-with-coffee-beside-glass-of-water-ynwSQ9Bd6cA',
          publicId: 'wooden_coffee_table_img1_123',
        },
        {
          url: 'https://unsplash.com/photos/white-ceramic-cup-filled-with-coffee-beside-glass-of-water-ynwSQ9Bd6cA',
          publicId: 'wooden_coffee_table_img2_123',
        },
      ],
      additionalInformation: [
        { name: 'Material', detail: 'Solid Wood' },
        { name: 'Dimensions', detail: '48"L x 24"W x 18"H' },
      ],
      categories: {
        connect: [{ id: livingRoomCategory.id }],
      },
      subcategories: {
        connect: [{ id: coffeeTablesSubCategory.id }],
      },
    },
  });

  await prisma.products.create({
    data: {
      name: 'Queen Bed Frame',
      price: 499,
      description:
        'A sturdy and stylish queen-sized bed frame for your bedroom.',
      stock: 25,
      discountPrice: 449,
      sale: '10%',
      saleDuration: new Date(),
      posterImageUrl:
        'https://unsplash.com/photos/a-bed-with-a-white-comforter-and-pillows-LaUbFByTsMY',
      posterImagePublicId: 'queen_bed_frame_poster_123',
      hoverImageUrl:
        'https://unsplash.com/photos/a-bed-with-a-white-comforter-and-pillows-LaUbFByTsMY',
      hoverImagePublicId: 'queen_bed_frame_hover_123',
      productImages: [
        {
          url: 'https://unsplash.com/photos/a-bed-with-a-white-comforter-and-pillows-LaUbFByTsMY',
          publicId: 'queen_bed_frame_img1_123',
        },
        {
          url: 'https://unsplash.com/photos/a-bed-with-a-white-comforter-and-pillows-LaUbFByTsMY',
          publicId: 'queen_bed_frame_img2_123',
        },
      ],
      additionalInformation: [
        { name: 'Material', detail: 'Pine Wood' },
        { name: 'Dimensions', detail: '86"L x 64"W x 52"H' },
      ],
      categories: {
        connect: [{ id: bedroomCategory.id }],
      },
      subcategories: {
        connect: [{ id: bedsSubCategory.id }],
      },
    },
  });

  await prisma.products.create({
    data: {
      name: '3-Door Wardrobe',
      price: 699,
      description: 'A spacious and elegant 3-door wardrobe for your bedroom.',
      stock: 15,
      discountPrice: 649,
      sale: '7%',
      saleDuration: new Date(),
      posterImageUrl:
        'https://unsplash.com/photos/a-rack-of-clothes-and-hats-in-a-room-_a_FlMKo4Lk',
      posterImagePublicId: 'wardrobe_poster_123',
      hoverImageUrl:
        'https://unsplash.com/photos/a-rack-of-clothes-and-hats-in-a-room-_a_FlMKo4Lk',
      hoverImagePublicId: 'wardrobe_hover_123',
      productImages: [
        {
          url: 'https://unsplash.com/photos/a-rack-of-clothes-and-hats-in-a-room-_a_FlMKo4Lk',
          publicId: 'wardrobe_img1_123',
        },
        {
          url: 'https://unsplash.com/photos/a-rack-of-clothes-and-hats-in-a-room-_a_FlMKo4Lk',
          publicId: 'wardrobe_img2_123',
        },
      ],
      additionalInformation: [
        { name: 'Material', detail: 'MDF Wood' },
        { name: 'Dimensions', detail: '72"H x 48"W x 24"D' },
      ],
      categories: {
        connect: [{ id: bedroomCategory.id }],
      },
      subcategories: {
        connect: [{ id: wardrobesSubCategory.id }],
      },
    },
  });
}


// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
