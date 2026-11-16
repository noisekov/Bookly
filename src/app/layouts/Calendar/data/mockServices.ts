import type { CalendarService } from "../types";

export const mockServices: CalendarService[] = [
  {
    id: "women-haircut",
    nameKey: "bookingWizard.services.womenHaircut",
    durationMinutes: 90,
    price: 2500,
  },
  {
    id: "manicure",
    nameKey: "bookingWizard.services.manicure",
    durationMinutes: 90,
    price: 2200,
  },
  {
    id: "men-haircut",
    nameKey: "bookingWizard.services.menHaircut",
    durationMinutes: 60,
    price: 1500,
  },
  {
    id: "hair-coloring",
    nameKey: "bookingWizard.services.hairColoring",
    durationMinutes: 120,
    price: 5500,
  },
  {
    id: "hair-styling",
    nameKey: "bookingWizard.services.hairStyling",
    durationMinutes: 60,
    price: 1800,
  },
  {
    id: "beard-trim",
    nameKey: "bookingWizard.services.beardTrim",
    durationMinutes: 60,
    price: 1000,
  },
];
