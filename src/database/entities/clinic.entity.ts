import {
  Column,
  Entity, JoinTable, ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { DoctorEntity } from './doctor.entity';

@Entity({ name: 'clinics' })
export class ClinicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.clinics)
  @JoinTable()
  doctors: DoctorEntity[];
}
