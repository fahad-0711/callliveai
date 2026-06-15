import { format, formatDistanceToNow, isToday, isTomorrow, isYesterday } from 'date-fns';

export function formatDate(dateStr) {
  if (!dateStr) return '—';
  const date = new Date(dateStr);
  if (isToday(date)) return 'Today';
  if (isTomorrow(date)) return 'Tomorrow';
  if (isYesterday(date)) return 'Yesterday';
  return format(date, 'MMM dd, yyyy');
}

export function formatRelativeDate(dateStr) {
  if (!dateStr) return '—';
  return formatDistanceToNow(new Date(dateStr), { addSuffix: true });
}

export function formatFullDate(dateStr) {
  if (!dateStr) return '—';
  return format(new Date(dateStr), 'EEEE, MMM dd');
}

export function getCurrentDateString() {
  return format(new Date(), 'EEEE, MMM dd');
}
