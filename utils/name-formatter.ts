import { DateTime } from 'luxon';

export const formatDifference = (difference: string) => {
  if (difference === '$0.00') {
    return difference;
  }

  if (difference.startsWith('-')) {
    return difference;
  }

  return `+${difference}`;
};

export const formatName = (name: string) => {
  if (name === 'Capital One Venture X') {
    return 'Venture X';
  }

  if (name === 'Chase Freedom Flex') {
    return 'Freedom Flex';
  }

  return name;
};

export const formatSyncName = (name: string) => {
  return name[0].toUpperCase() + name.slice(1);
};

export const formatDates = (date: string): string => {
  if (!date) {
    return '';
  }

  return DateTime.fromISO(date).toLocaleString(DateTime.DATETIME_SHORT);
}