import { PrismaClient } from '@prisma/client';

export const roleSeeds = async (prisma: PrismaClient) => {
  await prisma.roles.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'role_test_id_1',
        name: 'admin',
        userId: 'user_test_admin',
      },
      {
        id: 'user_test_id_2',
        name: 'user',
        userId: 'user_test_id_1',
      },
      {
        id: 'user_test_id_3',
        name: 'user',
        userId: 'user_test_id_2',
      },
    ],
  });
  console.info('Role sedder executed');
};
