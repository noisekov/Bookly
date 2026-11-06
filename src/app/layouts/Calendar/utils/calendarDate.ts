export const CALENDAR_START_HOUR = 9;
export const CALENDAR_END_HOUR = 18;
export const CALENDAR_SLOT_MINUTES = 30;
export const CALENDAR_SLOT_HEIGHT = 42;

const pad = (value: number) => String(value).padStart(2, "0");

export const toDateKey = (date: Date): string =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

export const fromDateKey = (dateKey: string): Date => {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const addDays = (date: Date, amount: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + amount);
  return result;
};

export const getWeekDates = (date: Date): Date[] => {
  const monday = new Date(date);
  const day = monday.getDay();
  monday.setDate(monday.getDate() + (day === 0 ? -6 : 1 - day));
  monday.setHours(0, 0, 0, 0);

  return Array.from({ length: 7 }, (_, index) => addDays(monday, index));
};

export const getTimeSlots = (): string[] => {
  const slots: string[] = [];

  for (
    let minutes = CALENDAR_START_HOUR * 60;
    minutes < CALENDAR_END_HOUR * 60;
    minutes += CALENDAR_SLOT_MINUTES
  ) {
    slots.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`);
  }

  return slots;
};

export const timeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

export const getBookingPosition = (startTime: string, endTime: string) => {
  const start = timeToMinutes(startTime);
  const end = timeToMinutes(endTime);
  const startOfDay = CALENDAR_START_HOUR * 60;
  const slotHeight = CALENDAR_SLOT_HEIGHT / CALENDAR_SLOT_MINUTES;

  return {
    top: Math.max(0, start - startOfDay) * slotHeight,
    height: Math.max(CALENDAR_SLOT_HEIGHT - 4, (end - start) * slotHeight - 4),
  };
};

export const formatCalendarDate = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);

export const formatWeekRange = (date: Date, locale: string): string => {
  const weekDates = getWeekDates(date);
  const start = weekDates[0]!;
  const end = weekDates[weekDates.length - 1]!;
  const sameMonth = start.getMonth() === end.getMonth();
  const sameYear = start.getFullYear() === end.getFullYear();

  if (locale.startsWith("ru")) {
    if (sameMonth) {
      const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(start);
      return `${start.getDate()}–${end.getDate()} ${month} ${end.getFullYear()} г.`;
    }
    return `${formatCalendarDate(start, locale)} – ${formatCalendarDate(end, locale)}`;
  }

  if (sameMonth && sameYear) {
    const month = new Intl.DateTimeFormat(locale, { month: "long" }).format(start);
    return `${start.getDate()}–${end.getDate()} ${month} ${end.getFullYear()}`;
  }

  return `${formatCalendarDate(start, locale)} – ${formatCalendarDate(end, locale)}`;
};

export const formatWeekday = (date: Date, locale: string): string =>
  new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
