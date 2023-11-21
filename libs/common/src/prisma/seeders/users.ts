import { PrismaClient } from '@prisma/client';

export const userSeeds = async (prisma: PrismaClient) => {
  await prisma.users.createMany({
    skipDuplicates: true,
    data: [
      {
        id: 'user_test_admin',
        firstName: 'Admin',
        lastName: 'Admin',
        email: 'admin@gmail.fr',
        password:
          '$2b$10$65PBMX4JboCyek5N4ER2aeAyJwbmnCkRfAiSjVIKwWcy13R/Y61c6', // u_user_test_password_1
      },
      {
        id: 'user_test_id_1',
        firstName: 'User 1',
        lastName: 'test_1',
        email: 'user_test_1@gmail.fr',
        password:
          '$2b$10$.KovVnzeknWq7oKbq/7HpuFZo.UhiBTvou7iBrUkqIX1a1ylKutRm', // u_user_test_password_2
      },
      {
        id: 'user_test_id_2',
        firstName: 'User 2',
        lastName: 'test_2',
        email: 'user_test_2@gmail.fr',
        password:
          '$2b$10$csf/pVaivwbtzMVPjH4FqemYV0rIcGTECMyPUQFcDvbNx4X88RNPi', // u_user_test_password_3
      },
    ],
  });
  console.info('User sedder executed');
};
