import { parseISO, setYear } from 'date-fns';

export function getFutureDateUtil(date: string): Date {
  return setYear(parseISO(date), new Date().getFullYear() + 1);
}