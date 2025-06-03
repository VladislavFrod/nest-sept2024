import { Column, Entity, OneToMany } from 'typeorm';

import { AdminRoleEnum } from '../../modules/users/models/enums/user-role.enum';
import { BaseModel } from './models/create-update.model';
import { RefreshTokenEntity } from './refresh-token.entity';

@Entity('user')
export class UserEntity extends BaseModel {
  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { select: false })
  password: string;

  @Column('text', { nullable: true })
  phone: string;

  @Column('enum', { enum: AdminRoleEnum, default: AdminRoleEnum.USER })
  role: AdminRoleEnum;

  @Column('boolean', { default: false })
  verify: boolean;

  @Column('boolean', { default: false })
  ban: boolean;

  @Column('text', { nullable: true })
  avatar_image?: string;

  @OneToMany(() => RefreshTokenEntity, (entity) => entity.user)
  refresh_tokens?: RefreshTokenEntity[];
}
