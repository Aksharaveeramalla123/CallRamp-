export type SlotLabelOptions = {
    locale: 'en-GB';
    timeZone: string;
  };
  
  function getDateParts(date: Date, timeZone: string): {
    year: number;
    month: number;
    day: number;
    hour: number;
    minute: number;
    weekday: string;
  } {
    const formatter = new Intl.DateTimeFormat('en-GB', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
      hourCycle: 'h23',
    });
  
    const parts = formatter.formatToParts(date);
  
    const get = (type: Intl.DateTimeFormatPartTypes) =>
      parts.find((part) => part.type === type)?.value ?? '';
  
    return {
      year: Number(get('year')),
      month: Number(get('month')),
      day: Number(get('day')),
      hour: Number(get('hour')),
      minute: Number(get('minute')),
      weekday: get('weekday'),
    };
  }
  
  function getDateKey(
    parts: Pick<ReturnType<typeof getDateParts>, 'year' | 'month' | 'day'>,
  ): number {
    return Date.UTC(parts.year, parts.month - 1, parts.day);
  }
  
  function ordinal(day: number): string {
    if (day >= 11 && day <= 13) {
      return `${day}th`;
    }
  
    switch (day % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  }
  
  function formatHour(hour: number): string {
    const twelveHour = hour % 12 || 12;
    return String(twelveHour);
  }
  
  function formatTime(hour: number, minute: number): string {
    if (minute === 0) {
      return formatHour(hour);
    }
  
    if (minute === 30) {
      return `half ${formatHour((hour + 1) % 24)}`;
    }
  
    return `${formatHour(hour)}:${String(minute).padStart(2, '0')}`;
  }
  
  function getTimePeriod(hour: number): string {
    if (hour < 12) {
      return 'morning';
    }
  
    if (hour < 17) {
      return 'afternoon';
    }
  
    return 'evening';
  }
  
  export function formatSlotLabel(
    startsAt: string | Date,
    now: string | Date,
    options: SlotLabelOptions,
  ): string {
    const startDate = new Date(startsAt);
    const nowDate = new Date(now);
  
    if (Number.isNaN(startDate.getTime())) {
      throw new Error(`Invalid startsAt timestamp: ${startsAt}`);
    }
  
    if (Number.isNaN(nowDate.getTime())) {
      throw new Error(`Invalid now timestamp: ${now}`);
    }
  
    if (options.locale !== 'en-GB') {
      throw new Error(`Unsupported locale: ${options.locale}`);
    }
  
    const start = getDateParts(startDate, options.timeZone);
    const current = getDateParts(nowDate, options.timeZone);
  
    const startDay = getDateKey(start);
    const currentDay = getDateKey(current);
  
    const daysApart = Math.round(
      (startDay - currentDay) / (24 * 60 * 60 * 1000),
    );
  
    const time = formatTime(start.hour, start.minute);
  
    if (daysApart === 0) {
      return `this ${getTimePeriod(start.hour)} at ${time}`;
    }
  
    if (daysApart === 1) {
      return `tomorrow at ${time}`;
    }
  
    if (daysApart > 1 && daysApart < 7) {
      return `${start.weekday} ${getTimePeriod(start.hour)} at ${time}`;
    }
  
    return `${start.weekday} the ${ordinal(start.day)} at ${time}`;
  }