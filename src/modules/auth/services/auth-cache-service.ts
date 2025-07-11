import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvConfigType, JWTConfigType } from '../../../configs/config.type';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class AuthAccessService {
  private readonly jwtConfig: JWTConfigType;

  constructor(
    private readonly redisService: RedisService,
    private readonly configService: ConfigService<EnvConfigType>,
  ) {
    this.jwtConfig = configService.get<JWTConfigType>('jwt');
  }

  private async getKey(userId: string, deviceId: string): Promise<string> {
    return `ACCESS_TOKEN:${userId}:${deviceId}`;
  }

  public async saveToken(
    token: string,
    userId: string,
    deviceId: string,
  ): Promise<void> {
    const key = await this.getKey(userId, deviceId);

    await this.redisService.deleteByKey(key);
    await this.redisService.addOneToSet(key, token);
    await this.redisService.expire(key, this.jwtConfig.accessExpire);
  }

  public async isAccessTokenExist(
    userId: string,
    deviceId: string,
    access: string,
  ): Promise<boolean> {
    const key = await this.getKey(userId, deviceId);

    const set = await this.redisService.sMembers(key);
    return set.includes(access);
  }

  public async deleteToken(userId: string, deviceId: string): Promise<void> {
    const key = await this.getKey(userId, deviceId);
    await this.redisService.deleteByKey(key);
  }
}
