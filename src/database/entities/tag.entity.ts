import { Column, Entity, PrimaryGeneratedColumn, VirtualColumn } from 'typeorm';

import { TagID } from '../../common/types/entity-ids.type';
import { TableNameEnum } from './enums/table-name.enum';
import { CreateUpdateModel } from './models/create-update.model';

@Entity(TableNameEnum.TAGS)
export class TagEntity extends CreateUpdateModel {
  @PrimaryGeneratedColumn('uuid')
  id: TagID;

  @Column('text')
  name: string;

  @VirtualColumn({ query: () => 'NULL' })
  articleCount?: number;
}
