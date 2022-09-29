import { areIntervalsOverlapping } from 'date-fns';

import { AppointmentEntity } from '../../entities/appointment.entity';
import { AppointmentsRepository } from '../appointments.repository';

export class InMemoryAppointmentsRepository implements AppointmentsRepository {
  public appointments: AppointmentEntity[] = [];

  async create(appointment: AppointmentEntity): Promise<void> {
    this.appointments.push(appointment);
  }

  async findOverlappingAppointment(startsAt: Date, endsAt: Date): Promise<AppointmentEntity | null> {
    const overlappingAppointment = this.appointments.find((appointment) => {
      return areIntervalsOverlapping({
        start: startsAt,
        end: endsAt
      },
      {
        start: appointment.startsAt,
        end: appointment.endsAt
      },
      {
        inclusive: true
      });
    });

    if (!overlappingAppointment) {
      return null;
    }

    return overlappingAppointment;
  }

}