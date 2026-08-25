export type BookingStatus = 'waiting-admin' | 'assigned' | 'accepted';

export type PreviewBooking = {
  id: string;
  direction: 'markapur-srisailam' | 'srisailam-markapur';
  directionLabel: string;
  tripType: 'one-way' | 'round-trip';
  tripLabel: string;
  pickupPoint: string;
  dropPoint: string;
  travelDate: string;
  pickupTime: string;
  returnDate: string | null;
  returnTime: string | null;
  vehicleId: string;
  vehicleName: string;
  vehicleCapacity: string;
  passengerName: string;
  mobile: string;
  comingFrom: string;
  pincode: string;
  notes: string;
  status: BookingStatus;
  assignedDriverId: string | null;
  assignedAt: string | null;
  acceptedAt: string | null;
  lastDeclinedDriverId: string | null;
  createdAt: string;
};

export const BOOKING_STORE_KEY = 'markapur_preview_bookings_v1';

export const getBookings = (): PreviewBooking[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(BOOKING_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveBookings = (bookings: PreviewBooking[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(BOOKING_STORE_KEY, JSON.stringify(bookings));
  window.dispatchEvent(new Event('markapur-preview-bookings-changed'));
};

export const getNextBookingId = () => {
  const numbers = getBookings()
    .map((booking) => Number(booking.id.replace('MKP-', '')))
    .filter((value) => Number.isFinite(value));
  const next = numbers.length ? Math.max(...numbers) + 1 : 1001;
  return `MKP-${next}`;
};

export const createBooking = (
  booking: Omit<PreviewBooking, 'id' | 'status' | 'assignedDriverId' | 'assignedAt' | 'acceptedAt' | 'lastDeclinedDriverId' | 'createdAt'>
) => {
  const newBooking: PreviewBooking = {
    ...booking,
    id: getNextBookingId(),
    status: 'waiting-admin',
    assignedDriverId: null,
    assignedAt: null,
    acceptedAt: null,
    lastDeclinedDriverId: null,
    createdAt: new Date().toISOString(),
  };
  saveBookings([newBooking, ...getBookings()]);
  return newBooking;
};

export const updateStoredBooking = (bookingId: string, updates: Partial<PreviewBooking>) => {
  const bookings = getBookings();
  const next = bookings.map((booking) => booking.id === bookingId ? { ...booking, ...updates } : booking);
  saveBookings(next);
  return next.find((booking) => booking.id === bookingId) || null;
};

export const assignBookingToDriver = (bookingId: string, driverId: string) =>
  updateStoredBooking(bookingId, {
    status: 'assigned',
    assignedDriverId: driverId,
    assignedAt: new Date().toISOString(),
    acceptedAt: null,
    lastDeclinedDriverId: null,
  });

export const acceptBooking = (bookingId: string, driverId: string) => {
  const booking = getBookings().find((item) => item.id === bookingId);
  if (!booking || booking.assignedDriverId !== driverId || booking.status !== 'assigned') return null;
  return updateStoredBooking(bookingId, {
    status: 'accepted',
    acceptedAt: new Date().toISOString(),
  });
};

export const declineBooking = (bookingId: string, driverId: string) => {
  const booking = getBookings().find((item) => item.id === bookingId);
  if (!booking || booking.assignedDriverId !== driverId || booking.status !== 'assigned') return null;
  return updateStoredBooking(bookingId, {
    status: 'waiting-admin',
    assignedDriverId: null,
    assignedAt: null,
    acceptedAt: null,
    lastDeclinedDriverId: driverId,
  });
};

export const returnBookingToAdmin = (bookingId: string) =>
  updateStoredBooking(bookingId, {
    status: 'waiting-admin',
    assignedDriverId: null,
    assignedAt: null,
    acceptedAt: null,
  });
