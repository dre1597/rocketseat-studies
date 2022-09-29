import { AppointmentEntity } from '../entities/appointment.entity';

export interface AppointmentsRepository {
  create(appointment: AppointmentEntity): Promise<void>;

  findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<AppointmentEntity | null>;
}