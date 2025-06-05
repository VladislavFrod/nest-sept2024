import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './models/create-update.model';
import { UserEntity } from './user.entity';

@Entity('refresh_tokens')
export class RefreshTokenEntity extends BaseModel {
  @Column('text')
  refresh: string;

  @Index()
  @Column('text')
  device: string;

  @Column('text')
  user_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.refresh_tokens, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user?: UserEntity;
}
