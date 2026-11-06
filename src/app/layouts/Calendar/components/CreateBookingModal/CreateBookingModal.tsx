import type { CalendarSlotSelection } from "../../types";

interface CreateBookingModalProps {
  isOpen: boolean;
  initialSlot: CalendarSlotSelection | null;
  onClose: () => void;
}

// UI placeholder: the calendar already routes empty-slot clicks here.
const CreateBookingModal = (_props: CreateBookingModalProps) => null;

export default CreateBookingModal;
