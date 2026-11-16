import type { CalendarBooking, CalendarEmployee } from "../types";

const OPENING_TIME_MINUTES = 9 * 60;
const CLOSING_TIME_MINUTES = 18 * 60 + 30;
const SLOT_INTERVAL_MINUTES = 30;

const pad = (value: number) => String(value).padStart(2, "0");

export const getBookingTimeSlots = (): string[] => {
  const slots: string[] = [];

  for (
    let minutes = OPENING_TIME_MINUTES;
    minutes <= CLOSING_TIME_MINUTES;
    minutes += SLOT_INTERVAL_MINUTES
  ) {
    slots.push(`${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`);
  }

  return slots;
};

const toMinutes = (time: string): number => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

interface IsBookingTimeAvailableParams {
  date: string;
  time: string;
  durationMinutes: number;
  specialistId: string;
  employees: CalendarEmployee[];
  bookings: CalendarBooking[];
}

/**
 * A time is available only when the full service fits into business hours
 * and at least one eligible employee has no overlapping booking.
 */
export const isBookingTimeAvailable = ({
  date,
  time,
  durationMinutes,
  specialistId,
  employees,
  bookings,
}: IsBookingTimeAvailableParams): boolean => {
  const availableEmployees = specialistId === "any"
    ? employees
    : employees.filter((employee) => employee.id === specialistId);

  if (availableEmployees.length === 0 || !date || !/^\d{2}:\d{2}$/.test(time)) {
    return false;
  }

  const slotStart = toMinutes(time);
  const slotEnd = slotStart + durationMinutes;

  if (
    slotStart < OPENING_TIME_MINUTES
    || slotEnd > CLOSING_TIME_MINUTES
    || durationMinutes <= 0
  ) {
    return false;
  }

  return availableEmployees.some((employee) => {
    const hasOverlap = bookings.some((booking) => {
      if (booking.date !== date || booking.employeeId !== employee.id) {
        return false;
      }

      const bookingStart = toMinutes(booking.startTime);
      const bookingEnd = toMinutes(booking.endTime);

      return slotStart < bookingEnd && slotEnd > bookingStart;
    });

    return !hasOverlap;
  });
};

export const getLocalDateKey = (date: Date): string => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());

  return `${year}-${month}-${day}`;
};

export const addMinutesToTime = (time: string, durationMinutes: number): string => {
  const totalMinutes = toMinutes(time) + durationMinutes;
  return `${pad(Math.floor(totalMinutes / 60))}:${pad(totalMinutes % 60)}`;
};
