import {
  Column,
  Entity, JoinTable, ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ClinicEntity } from './clinic.entity';
import { ServiceEntity } from './service.entity';


@Entity({ name: 'doctors' })
export class DoctorEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  middleName: string;

  @Column()
  phoneNumber: string;

  @ManyToMany(() => ClinicEntity, (clinic) => clinic.doctors)
  clinics: ClinicEntity[];

  @ManyToMany(() => ServiceEntity, (service) => service.doctors)
  @JoinTable()
  services: ServiceEntity[];

}
