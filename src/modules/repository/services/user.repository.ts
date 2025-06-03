import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from '../../../database/entities/user.entity';
import { IUserData } from '../../auth/models/interfaces/user-data.interface';
import { rolePick } from '../../users/constants/rolePick';
import { GetUsersQueryReqDto } from '../../users/models/dto/req/get-users-query.req.dto';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getUsers(
    userData: IUserData,
    { search, page, limit, role, user_id }: GetUsersQueryReqDto,
  ): Promise<[UserEntity[], number]> {
    try {
      const queryResult = this.createQueryBuilder('user')
        .take(limit)
        .skip((page - 1) * limit)
        .orderBy({ 'user.created': 'ASC' })
        .andWhere('user.role IN (:...roles)', {
          roles: rolePick[userData.user.role],
        });

      if (role) {
        queryResult.andWhere('user.role = :role', { role });
      }
      if (user_id) {
        queryResult.andWhere('user.id = :user_id', { user_id });
      }
      if (search) {
        queryResult.andWhere(
          'CONCAT(user.id, user.email, user.first_name, user.last_name, user.phone) ILIKE :search',
          {
            search: `%${search}%`,
          },
        );
      }

      console.log('Users fetched:', queryResult.getQueryAndParameters());
      return await queryResult.getManyAndCount();
    } catch (err) {
      throw new Error(err);
    }
  }
}
