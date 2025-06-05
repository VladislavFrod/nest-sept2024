import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DoctorEntity } from './doctor.entity';

@Entity({ name: 'services' })
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToMany(() => DoctorEntity, (doctor) => doctor.services)
  doctors: DoctorEntity[];
}
