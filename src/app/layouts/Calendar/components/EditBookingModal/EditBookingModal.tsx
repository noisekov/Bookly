import type { CalendarBooking } from "../../types";

interface EditBookingModalProps {
  isOpen: boolean;
  booking: CalendarBooking | null;
  onClose: () => void;
}

// UI placeholder: the calendar already routes existing-booking clicks here.
const EditBookingModal = (_props: EditBookingModalProps) => null;

export default EditBookingModal;
