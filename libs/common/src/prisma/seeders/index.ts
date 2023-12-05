import { PrismaClient } from '@prisma/client';
import { roleSeeds } from './roles';
import { userSeeds } from './users';
const prisma = new PrismaClient();

async function main() {
  await userSeeds(prisma);
  await roleSeeds(prisma);
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
