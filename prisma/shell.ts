import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({ log: [{ emit: 'event', level: 'query' }] });

prisma.$on('query', (event) => {
  console.log('Query:\n', event.query);
});

async function main() {
  console.log('Try up with Prisma ORM～ 🚀');
  // 做 Prisma 的 ORM 操作
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
