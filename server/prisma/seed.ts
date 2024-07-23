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
