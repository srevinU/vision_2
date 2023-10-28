import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService {
  public prisma: PrismaClient = this.getPrismaClient();

  public getPrismaClient(): PrismaClient {
    if (this.prisma == null)
      this.prisma = new PrismaClient({ log: ['query', 'info', 'error'] });
    return this.prisma;
  }
}
