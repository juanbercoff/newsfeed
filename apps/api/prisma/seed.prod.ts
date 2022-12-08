import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

const seed = async () => {
  await prisma.tag.createMany({
    data: [
      { name: 'Ciencia' },
      { name: 'Politica' },
      { name: 'Tecnologia' },
      { name: 'Musica' },
    ],
  });
};

(async function () {
  try {
    await seed();
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
