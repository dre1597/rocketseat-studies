import { describe, expect, test } from 'vitest';

import { getFutureDateUtil } from '../tests/utils/get-future-date.util';
import { AppointmentEntity } from './appointment.entity';

describe('AppointmentEntity', () => {
  test('create an appointment', () => {
    const startsAt = getFutureDateUtil('2022-08-10');
    const endsAt = getFutureDateUtil('2022-08-11');

    startsAt.setDate(startsAt.getDate() + 1);
    endsAt.setDate(endsAt.getDate() + 2);

    const appointment = new AppointmentEntity({
      costumer: 'any_costumer',
      startsAt,
      endsAt
    });

    expect(appointment).toBeInstanceOf(AppointmentEntity);
    expect(appointment.costumer).toEqual('any_costumer');
  });

  test('cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDateUtil('2022-08-10');
    const endsAt = getFutureDateUtil('2022-08-09');

    endsAt.setDate(endsAt.getDate() - 1);

    expect(() => {
      new AppointmentEntity({
        costumer: 'any_costumer',
        startsAt,
        endsAt
      });
    }).toThrow();
  });

  test('cannot create an appointment with start date before now', () => {
    const startsAt = new Date();
    const endsAt = new Date();

    startsAt.setDate(startsAt.getDate() - 1);
    endsAt.setDate(endsAt.getDate() + 3);

    expect(() => {
      new AppointmentEntity({
        costumer: 'any_costumer',
        startsAt,
        endsAt
      });
    }).toThrow();
  });
});
