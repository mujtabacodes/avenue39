import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const users = [
    {
      name: 'Mujtaba',
      email: 'mujtaba.shafique@gmail.com',
      password: 'mujtaba',
      phone: '+920000000',
    },
    {
      name: 'admin',
      email: 'admin@gmail.com',
      password: 'admin',
      phone: '+920000000',
    },
  ];
  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        password: user.password,
        phone: user.phone,
      },
      create: {
        name: user.name,
        email: user.email,
        password: user.password,
        phone: user.phone,
      },
    });
  }

  // Seed categories
  const categories = [
    {
      name: 'Electronics',
      posterImageUrl: 'https://example.com/electronics.jpg',
      posterImagePublicId: 'electronics-public-id',
    },
    {
      name: 'Home Appliances',
      posterImageUrl: 'https://example.com/home-appliances.jpg',
      posterImagePublicId: 'home-appliances-public-id',
    },
  ];

  const createdCategories = await Promise.all(
    categories.map((category) =>
      prisma.categories.upsert({
        where: { name: category.name },
        update: {
          posterImageUrl: category.posterImageUrl,
          posterImagePublicId: category.posterImagePublicId,
        },
        create: {
          name: category.name,
          posterImageUrl: category.posterImageUrl,
          posterImagePublicId: category.posterImagePublicId,
        },
      }),
    ),
  );

  // Seed products
  const products = [
    {
      name: 'Smartphone X',
      price: 699,
      description: 'Latest smartphone with advanced features.',
      stock: 100,
      discountPrice: 599,
      productCode: 'SPX123',
      posterImageUrl: 'https://example.com/smartphone-x.jpg',
      posterImagePublicId: 'smartphone-x-public-id',
      hoverImageUrl: 'https://example.com/smartphone-x-hover.jpg',
      hoverImagePublicId: 'smartphone-x-hover-id',
      productImages: [
        {
          public_id: 'abc',
          imageUrl: 'https://example.com/washing-machine-pro-side.jpg',
        },
        {
          public_id: 'abc',
          imageUrl: 'https://example.com/washing-machine-pro-side.jpg',
        },
      ],
      additionalInformation: [
        { colors: ['red', 'blue', 'red'] },
        { dimention: ['10*10', '20*20'] },
      ],
      categoriesId: createdCategories[0].id,
    },
    {
      name: 'Washing Machine Pro',
      price: 499,
      description: 'High-efficiency washing machine with multiple modes.',
      stock: 50,
      discountPrice: 449,
      productCode: 'WMP456',
      posterImageUrl: 'https://example.com/washing-machine-pro.jpg',
      posterImagePublicId: 'washing-machine-pro-public-id',
      hoverImageUrl: 'https://example.com/washing-machine-pro-hover.jpg',
      hoverImagePublicId: 'washing-machine-pro-hover-id',
      productImages: [
        {
          public_id: 'abc',
          imageUrl: 'https://example.com/washing-machine-pro-side.jpg',
        },
        {
          public_id: 'abc',
          imageUrl: 'https://example.com/washing-machine-pro-side.jpg',
        },
      ],
      additionalInformation: [
        { colors: ['red', 'blue', 'red'] },
        { dimention: ['10*10', '20*20'] },
      ],
      categoriesId: createdCategories[1].id,
    },
  ];

  await Promise.all(
    products.map((product) =>
      prisma.products.upsert({
        where: { productCode: product.productCode },
        update: {
          name: product.name,
          price: product.price,
          description: product.description,
          stock: product.stock,
          discountPrice: product.discountPrice,
          posterImageUrl: product.posterImageUrl,
          posterImagePublicId: product.posterImagePublicId,
          hoverImageUrl: product.hoverImageUrl,
          hoverImagePublicId: product.hoverImagePublicId,
          productImages: product.productImages,
          additionalInformation: product.additionalInformation,
          categoriesId: product.categoriesId,
        },
        create: product,
      }),
    ),
  );

  const reviews = [
    {
      Name: 'Alice',
      Email: 'alice@example.com',
      review: 'Excellent smartphone with great features!',
      star: 5,
      productsId: 1,
    },
    {
      Name: 'Bob',
      Email: 'bob@example.com',
      review: 'Good washing machine but a bit noisy.',
      star: 3,
      productsId: 2,
    },
  ];

  reviews.forEach(async (review) => {
    await prisma.reviews.create({
      data: review,
    });
  });

  console.log('Seed data inserted successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
