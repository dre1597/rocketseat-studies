import { AppointmentEntity } from '../entities/appointment.entity';
import { AppointmentsRepository } from '../repositories/appointments.repository';

type CreateAppointmentRequest = {
  costumer: string;
  startsAt: Date;
  endsAt: Date;
}
type CreateAppointmentResponse = AppointmentEntity

export class CreateAppointmentService {
  constructor(private appointmentsRepository: AppointmentsRepository) {
  }

  async execute({startsAt, costumer, endsAt}: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overlappingAppointment = await this.appointmentsRepository.findOverlappingAppointment(startsAt, endsAt);

    if (overlappingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates');
    }

    const appointment = new AppointmentEntity({
      startsAt,
      costumer,
      endsAt
    });

    await this.appointmentsRepository.create(appointment);

    return appointment;
  }
}