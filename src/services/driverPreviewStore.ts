export type DriverStatus = 'active' | 'disabled';
export type DriverLocation = 'markapur' | 'srisailam' | 'on-trip-srisailam' | 'on-trip-markapur' | 'offline';
export type AvailabilityStatus = 'available' | 'busy' | 'not-available';

export type PreviewDriver = {
  id: string;
  name: string;
  username: string;
  password: string;
  mobile: string;
  vehicle: string;
  vehicleNumber: string;
  status: DriverStatus;
  location: DriverLocation;
  availability: AvailabilityStatus;
};

export const DRIVER_STORE_KEY = 'markapur_preview_drivers_v1';
export const DRIVER_SESSION_KEY = 'markapur_preview_driver_session_v1';

export const locationLabels: Record<DriverLocation, string> = {
  markapur: 'Markapur',
  srisailam: 'Srisailam',
  'on-trip-srisailam': 'On Trip → Srisailam',
  'on-trip-markapur': 'On Trip → Markapur',
  offline: 'Offline / Unknown',
};

export const availabilityLabels: Record<AvailabilityStatus, string> = {
  available: 'Available',
  busy: 'Busy',
  'not-available': 'Not Available',
};

export const getDrivers = (): PreviewDriver[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(DRIVER_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveDrivers = (drivers: PreviewDriver[]) => {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(DRIVER_STORE_KEY, JSON.stringify(drivers));
};

export const updateStoredDriver = (driverId: string, updates: Partial<PreviewDriver>) => {
  const drivers = getDrivers();
  const next = drivers.map((driver) => driver.id === driverId ? { ...driver, ...updates } : driver);
  saveDrivers(next);
  return next.find((driver) => driver.id === driverId) || null;
};
