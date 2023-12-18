import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class RedisService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  public async add(key: string, values: object): Promise<void> {
    try {
      await this.cacheManager.set(key, values, 2000);
    } catch (error) {
      console.error(error);
    }
  }

  public async delete(key: string): Promise<void> {
    try {
      await this.cacheManager.del(key);
    } catch (error) {
      console.error(error);
    }
  }

  public async get(key: string): Promise<string> {
    try {
      return await this.cacheManager.get(key);
    } catch (error) {
      console.error(error);
    }
  }
}
