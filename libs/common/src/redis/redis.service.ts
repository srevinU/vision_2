import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async add(emailKey: string, values: string): Promise<void> {
    try {
      await this.cacheManager.set(emailKey, values, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  public async delete(emailKey: string): Promise<void> {
    try {
      await this.cacheManager.del(emailKey);
    } catch (error) {
      console.error(error);
    }
  }

  public async get(emailKey: string): Promise<string> {
    try {
      return await this.cacheManager.get(emailKey);
    } catch (error) {
      console.error(error);
    }
  }
}
