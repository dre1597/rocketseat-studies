import { describe, expect, test } from 'vitest';
import { getFutureDateUtil } from './get-future-date.util';

describe('GetFutureDateUtil', () => {
  test('increases date with one year', () => {
    const year = new Date().getFullYear();

    expect(getFutureDateUtil(`${year}-08-10`).getFullYear()).toEqual(year + 1);
  });
});

