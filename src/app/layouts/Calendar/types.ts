export type CalendarViewMode = "day" | "week";
export type BookingStatus = "confirmed" | "pending";
export type BookingColor = "violet" | "orange" | "blue";

export interface CalendarEmployee {
  id: string;
  name: string;
  role: string;
  initials: string;
  color: BookingColor;
}

export interface CalendarBooking {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
  clientName: string;
  serviceName: string;
  employeeId: string;
  status: BookingStatus;
  color: BookingColor;
  price: number;
}

export interface CalendarSlotSelection {
  date: string;
  time: string;
  employeeId?: string;
}

export interface CalendarWidgetProps {
  employees?: CalendarEmployee[];
  bookings?: CalendarBooking[];
  initialDate?: Date;
}
