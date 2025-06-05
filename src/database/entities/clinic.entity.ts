import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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

  services?: ServiceEntity[];
}
