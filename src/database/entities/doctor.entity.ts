import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ClinicEntity } from './clinic.entity';
import { ServiceEntity } from './service.entity';

@Entity({ name: 'doctors' })
export class DoctorEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  first_name: string;

  @Column('text')
  last_name: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', { nullable: true })
  phone: string;

  @ManyToMany(() => ClinicEntity, (clinic) => clinic.doctors)
  @JoinTable({
    name: 'doctor_clinics',
    joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'clinic_id', referencedColumnName: 'id' },
  })
  clinics: ClinicEntity[];

  @ManyToMany(() => ServiceEntity, (service) => service.doctors)
  @JoinTable({
    name: 'doctor_services',
    joinColumn: { name: 'doctor_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'service_id', referencedColumnName: 'id' },
  })
  services: ServiceEntity[];
}
