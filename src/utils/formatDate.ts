import { Duration } from 'moment';

function normalizeNumber(number: number): string {
  const stringifiedNumber = number.toString();
  return stringifiedNumber.length === 1
    ? 0 + stringifiedNumber
    : stringifiedNumber;
}

export default function formatDate(duration: Duration): string {
  const days = duration.days();
  const hours = duration.hours() + 24 * days;
  const minutes = duration.minutes();
  const seconds = duration.seconds();
  return `${normalizeNumber(hours)}:${normalizeNumber(
    minutes
  )}:${normalizeNumber(seconds)}`;
}
