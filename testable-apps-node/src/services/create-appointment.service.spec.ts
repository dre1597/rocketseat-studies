import { describe, expect, it } from 'vitest';

import { AppointmentEntity } from '../entities/appointment.entity';
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments.repository';
import { getFutureDateUtil } from '../tests/utils/get-future-date.util';
import { CreateAppointmentService } from './create-appointment.service';

describe('Create AppointmentEntity', () => {
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDateUtil('2022-08-10');
    const endsAt = getFutureDateUtil('2022-08-11');

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    expect(createAppointment.execute({
      costumer: 'any_costumer',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(AppointmentEntity);
  });

  it('should not be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDateUtil('2022-08-10');
    const endsAt = getFutureDateUtil('2022-08-15');

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    const appointmentsRepository = new InMemoryAppointmentsRepository();
    const createAppointment = new CreateAppointmentService(appointmentsRepository);

    await createAppointment.execute({
      costumer: 'any_costumer',
      startsAt,
      endsAt
    });

    expect(createAppointment.execute({
      costumer: 'any_costumer',
      startsAt: getFutureDateUtil('2022-08-14'),
      endsAt: getFutureDateUtil('2022-08-18')
    })).rejects.toBeInstanceOf(Error);

    expect(createAppointment.execute({
      costumer: 'any_costumer',
      startsAt: getFutureDateUtil('2022-08-08'),
      endsAt: getFutureDateUtil('2022-08-12')
    })).rejects.toBeInstanceOf(Error);

    expect(createAppointment.execute({
      costumer: 'any_costumer',
      startsAt: getFutureDateUtil('2022-08-08'),
      endsAt: getFutureDateUtil('2022-08-17')
    })).rejects.toBeInstanceOf(Error);

    expect(createAppointment.execute({
      costumer: 'any_costumer',
      startsAt: getFutureDateUtil('2022-08-11'),
      endsAt: getFutureDateUtil('2022-08-14')
    })).rejects.toBeInstanceOf(Error);
  });
});
