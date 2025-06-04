import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { DoctorEntity } from './doctor.entity';
import { ServiceEntity } from './service.entity';

@Entity({ name: 'clinics' })
export class ClinicEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.clinics)
  doctors: DoctorEntity[];

  // Послуги клініки — не зв’язок у БД, а поле для зручності (будемо формувати у сервісі)
  services?: ServiceEntity[];
}
