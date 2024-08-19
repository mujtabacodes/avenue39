// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function main() {
//   const livingRoomCategory = await prisma.categories.create({
//     data: {
//       name: 'Living Room',
//       posterImageUrl:
//         'https://unsplash.com/photos/the-interior-with-leather-sofa-on-empty-white-wall-background3d-rendering-ZXEv4N7xXjg',
//       posterImagePublicId: 'living_room_poster_123',
//     },
//   });

//   const bedroomCategory = await prisma.categories.create({
//     data: {
//       name: 'Bedroom',
//       posterImageUrl: 'https://example.com/bedroom.jpg',
//       posterImagePublicId: 'bedroom_poster_123',
//     },
//   });

//   // Seed SubCategories
//   const sofasSubCategory = await prisma.subCategories.create({
//     data: {
//       name: 'Sofas',
//       posterImageUrl: 'https://example.com/sofas.jpg',
//       posterImagePublicId: 'sofas_poster_123',
//       categoriesId: livingRoomCategory.id, // Link to Living Room Category
//     },
//   });

//   const coffeeTablesSubCategory = await prisma.subCategories.create({
//     data: {
//       name: 'Coffee Tables',
//       posterImageUrl: 'https://example.com/coffee-tables.jpg',
//       posterImagePublicId: 'coffee_tables_poster_123',
//       categoriesId: livingRoomCategory.id, // Link to Living Room Category
//     },
//   });

//   const bedsSubCategory = await prisma.subCategories.create({
//     data: {
//       name: 'Beds',
//       posterImageUrl: 'https://example.com/beds.jpg',
//       posterImagePublicId: 'beds_poster_123',
//       categoriesId: bedroomCategory.id, // Link to Bedroom Category
//     },
//   });

//   const wardrobesSubCategory = await prisma.subCategories.create({
//     data: {
//       name: 'Wardrobes',
//       posterImageUrl: 'https://example.com/wardrobes.jpg',
//       posterImagePublicId: 'wardrobes_poster_123',
//       categoriesId: bedroomCategory.id, // Link to Bedroom Category
//     },
//   });

//   // Seed Products
//   await prisma.products.create({
//     data: {
//       name: 'Modern Sofa',
//       price: 899,
//       description:
//         'A stylish and comfortable modern sofa for your living room.',
//       stock: 20,
//       discountPrice: 799,
//       sale: '10%',
//       saleDuration: new Date(),
//       posterImageUrl: 'https://example.com/modern-sofa.jpg',
//       posterImagePublicId: 'modern_sofa_poster_123',
//       hoverImageUrl: 'https://example.com/modern-sofa-hover.jpg',
//       hoverImagePublicId: 'modern_sofa_hover_123',
//       productImages: [
//         {
//           url: 'https://example.com/modern-sofa1.jpg',
//           publicId: 'modern_sofa_img1_123',
//         },
//         {
//           url: 'https://example.com/modern-sofa2.jpg',
//           publicId: 'modern_sofa_img2_123',
//         },
//       ],
//       additionalInformation: [
//         { key: 'Material', value: 'Leather' },
//         { key: 'Dimensions', value: '82"W x 35"H x 36"D' },
//       ],
//       categories: {
//         connect: [{ id: livingRoomCategory.id }],
//       },
//       subcategories: {
//         connect: [{ id: sofasSubCategory.id }],
//       },
//     },
//   });

//   await prisma.products.create({
//     data: {
//       name: 'Wooden Coffee Table',
//       price: 199,
//       description:
//         'A rustic wooden coffee table that adds charm to your living room.',
//       stock: 50,
//       discountPrice: 179,
//       sale: '10%',
//       saleDuration: new Date(),
//       posterImageUrl: 'https://example.com/wooden-coffee-table.jpg',
//       posterImagePublicId: 'wooden_coffee_table_poster_123',
//       hoverImageUrl: 'https://example.com/wooden-coffee-table-hover.jpg',
//       hoverImagePublicId: 'wooden_coffee_table_hover_123',
//       productImages: [
//         {
//           url: 'https://example.com/wooden-coffee-table1.jpg',
//           publicId: 'wooden_coffee_table_img1_123',
//         },
//         {
//           url: 'https://example.com/wooden-coffee-table2.jpg',
//           publicId: 'wooden_coffee_table_img2_123',
//         },
//       ],
//       additionalInformation: [
//         { key: 'Material', value: 'Solid Wood' },
//         { key: 'Dimensions', value: '48"L x 24"W x 18"H' },
//       ],
//       categories: {
//         connect: [{ id: livingRoomCategory.id }],
//       },
//       subcategories: {
//         connect: [{ id: coffeeTablesSubCategory.id }],
//       },
//     },
//   });

//   await prisma.products.create({
//     data: {
//       name: 'Queen Bed Frame',
//       price: 499,
//       description:
//         'A sturdy and stylish queen-sized bed frame for your bedroom.',
//       stock: 25,
//       discountPrice: 449,
//       sale: '10%',
//       saleDuration: new Date(),
//       posterImageUrl: 'https://example.com/queen-bed-frame.jpg',
//       posterImagePublicId: 'queen_bed_frame_poster_123',
//       hoverImageUrl: 'https://example.com/queen-bed-frame-hover.jpg',
//       hoverImagePublicId: 'queen_bed_frame_hover_123',
//       productImages: [
//         {
//           url: 'https://example.com/queen-bed-frame1.jpg',
//           publicId: 'queen_bed_frame_img1_123',
//         },
//         {
//           url: 'https://example.com/queen-bed-frame2.jpg',
//           publicId: 'queen_bed_frame_img2_123',
//         },
//       ],
//       additionalInformation: [
//         { key: 'Material', value: 'Pine Wood' },
//         { key: 'Dimensions', value: '86"L x 64"W x 52"H' },
//       ],
//       categories: {
//         connect: [{ id: bedroomCategory.id }],
//       },
//       subcategories: {
//         connect: [{ id: bedsSubCategory.id }],
//       },
//     },
//   });

//   await prisma.products.create({
//     data: {
//       name: '3-Door Wardrobe',
//       price: 699,
//       description: 'A spacious and elegant 3-door wardrobe for your bedroom.',
//       stock: 15,
//       discountPrice: 649,
//       sale: '7%',
//       saleDuration: new Date(),
//       posterImageUrl: 'https://example.com/wardrobe.jpg',
//       posterImagePublicId: 'wardrobe_poster_123',
//       hoverImageUrl: 'https://example.com/wardrobe-hover.jpg',
//       hoverImagePublicId: 'wardrobe_hover_123',
//       productImages: [
//         {
//           url: 'https://example.com/wardrobe1.jpg',
//           publicId: 'wardrobe_img1_123',
//         },
//         {
//           url: 'https://example.com/wardrobe2.jpg',
//           publicId: 'wardrobe_img2_123',
//         },
//       ],
//       additionalInformation: [
//         { key: 'Material', value: 'MDF Wood' },
//         { key: 'Dimensions', value: '72"H x 48"W x 24"D' },
//       ],
//       categories: {
//         connect: [{ id: bedroomCategory.id }],
//       },
//       subcategories: {
//         connect: [{ id: wardrobesSubCategory.id }],
//       },
//     },
//   });

//   console.log('Seed data created successfully!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
