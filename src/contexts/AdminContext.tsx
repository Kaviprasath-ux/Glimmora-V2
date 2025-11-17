import { createContext, useState, useContext, ReactNode } from 'react';

export interface Booking {
  id: string;
  bookingNumber: string;
  guestName: string;
  guestEmail: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  preCheckinCompleted: boolean;
  specialRequests?: string;
  createdAt: string;
}

export interface Room {
  id: string;
  roomNumber: string;
  roomType: string;
  floor: number;
  status: 'available' | 'occupied' | 'cleaning' | 'maintenance';
  pricePerNight: number;
  features: string[];
  lastCleaned?: string;
  currentGuest?: string;
  maxOccupancy: number;
  bedType: string;
}

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  loyaltyPoints: number;
  totalBookings: number;
  totalSpent: number;
  memberSince: string;
  vipStatus: boolean;
  lastVisit?: string;
  address?: string;
  preferences?: string;
}

interface Staff {
  id: string;
  name: string;
  role: 'manager' | 'front-desk' | 'housekeeping' | 'maintenance' | 'concierge';
  email: string;
  phone: string;
  status: 'active' | 'on-break' | 'off-duty';
  shift: 'morning' | 'evening' | 'night';
  hireDate: string;
  salary?: number;
}

interface AdminContextType {
  bookings: Booking[];
  rooms: Room[];
  guests: Guest[];
  staff: Staff[];
  stats: {
    todayCheckIns: number;
    todayCheckOuts: number;
    todayRevenue: number;
    occupancyRate: number;
    availableRooms: number;
    totalRooms: number;
    pendingPreCheckins: number;
    totalRevenue: number;
    revenueChange: number;
    totalBookings: number;
    bookingsChange: number;
    occupancyChange: number;
    totalGuests: number;
    guestsChange: number;
  };
  revenueData: { month: string; revenue: number }[];
  roomTypeData: { type: string; revenue: number; count: number; percent: number }[];
  addBooking: (booking: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt'>) => void;
  updateBooking: (id: string, data: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  addRoom: (room: Omit<Room, 'id'>) => void;
  updateRoom: (id: string, data: Partial<Room>) => void;
  deleteRoom: (id: string) => void;
  addGuest: (guest: Omit<Guest, 'id'>) => void;
  updateGuest: (id: string, data: Partial<Guest>) => void;
  addStaff: (staff: Omit<Staff, 'id'>) => void;
  updateStaff: (id: string, data: Partial<Staff>) => void;
  updateStaffStatus: (id: string, status: Staff['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

// Helper functions to generate realistic data
const generateBookings = (): Booking[] => {
  const bookings: Booking[] = [];
  const statuses: Booking['status'][] = ['confirmed', 'checked-in', 'checked-out', 'cancelled'];
  const paymentStatuses: Booking['paymentStatus'][] = ['paid', 'pending', 'refunded'];
  const roomTypes = ['Standard Room', 'Deluxe Suite', 'Ocean View Room', 'Executive Suite', 'Presidential Suite'];
  const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Emma', 'James', 'Olivia', 'Robert', 'Sophia'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson'];

  for (let i = 1; i <= 100; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`;

    const checkInDate = new Date(2024, 11, Math.floor(Math.random() * 30) + 1);
    const nights = Math.floor(Math.random() * 7) + 1;
    const checkOutDate = new Date(checkInDate);
    checkOutDate.setDate(checkOutDate.getDate() + nights);

    const roomType = roomTypes[Math.floor(Math.random() * roomTypes.length)];
    const basePrice = roomType === 'Presidential Suite' ? 800 :
                      roomType === 'Executive Suite' ? 400 :
                      roomType === 'Ocean View Room' ? 300 :
                      roomType === 'Deluxe Suite' ? 250 : 150;

    bookings.push({
      id: `${i}`,
      bookingNumber: `BK-2024-${String(i).padStart(3, '0')}`,
      guestName: name,
      guestEmail: email,
      roomType,
      roomNumber: String(Math.floor(Math.random() * 2000) + 101),
      checkIn: checkInDate.toISOString().split('T')[0],
      checkOut: checkOutDate.toISOString().split('T')[0],
      guests: Math.floor(Math.random() * 4) + 1,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      totalAmount: basePrice * nights,
      paymentStatus: paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)],
      preCheckinCompleted: Math.random() > 0.3,
      specialRequests: Math.random() > 0.7 ? 'High floor preferred' : undefined,
      createdAt: new Date(2024, 11, Math.floor(Math.random() * 20) + 1).toISOString(),
    });
  }

  return bookings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

const generateRooms = (): Room[] => {
  const rooms: Room[] = [];
  const statuses: Room['status'][] = ['available', 'occupied', 'cleaning', 'maintenance'];
  const bedTypes = ['King Bed', 'Queen Bed', 'Twin Beds', '2 Queen Beds'];
  const baseFeatures = ['WiFi', 'TV', 'Mini Bar', 'Safe'];

  for (let floor = 5; floor <= 20; floor++) {
    for (let room = 1; room <= 6; room++) {
      const roomNumber = `${floor}${String(room).padStart(2, '0')}`;
      const roomType = floor >= 18 ? 'Presidential Suite' :
                       floor >= 15 ? 'Executive Suite' :
                       floor >= 12 ? 'Deluxe Suite' :
                       floor >= 8 ? 'Ocean View Room' : 'Standard Room';

      const price = roomType === 'Presidential Suite' ? 800 :
                    roomType === 'Executive Suite' ? 400 :
                    roomType === 'Ocean View Room' ? 300 :
                    roomType === 'Deluxe Suite' ? 250 : 150;

      const features = [...baseFeatures];
      if (floor >= 8) features.push('Ocean View');
      if (floor >= 12) features.push('Balcony');
      if (floor >= 15) features.push('Office Space');
      if (floor >= 18) features.push('Living Room', '2 Bathrooms');

      rooms.push({
        id: roomNumber,
        roomNumber,
        roomType,
        floor,
        status: statuses[Math.floor(Math.random() * statuses.length)],
        pricePerNight: price,
        features,
        lastCleaned: Math.random() > 0.5 ? new Date(2024, 11, 17, Math.floor(Math.random() * 24)).toISOString() : undefined,
        currentGuest: Math.random() > 0.7 ? 'Guest Name' : undefined,
        maxOccupancy: roomType === 'Presidential Suite' ? 6 : Math.floor(Math.random() * 2) + 2,
        bedType: bedTypes[Math.floor(Math.random() * bedTypes.length)],
      });
    }
  }

  return rooms;
};

const generateGuests = (): Guest[] => {
  const guests: Guest[] = [];
  const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Emma', 'James', 'Olivia', 'Robert', 'Sophia',
                      'William', 'Isabella', 'Daniel', 'Mia', 'Matthew', 'Charlotte', 'Joseph', 'Amelia', 'Christopher', 'Harper'];
  const lastNames = ['Smith', 'Johnson', 'Brown', 'Davis', 'Wilson', 'Moore', 'Taylor', 'Anderson', 'Thomas', 'Jackson',
                     'White', 'Harris', 'Martin', 'Garcia', 'Martinez', 'Robinson', 'Clark', 'Rodriguez', 'Lewis', 'Lee'];

  for (let i = 1; i <= 50; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const name = `${firstName} ${lastName}`;
    const totalBookings = Math.floor(Math.random() * 20) + 1;
    const totalSpent = totalBookings * (Math.floor(Math.random() * 1000) + 500);
    const loyaltyPoints = Math.floor(totalSpent * 0.1);

    guests.push({
      id: `${i}`,
      name,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${i}@email.com`,
      phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
      loyaltyPoints,
      totalBookings,
      totalSpent,
      memberSince: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      vipStatus: loyaltyPoints > 2000,
      lastVisit: Math.random() > 0.3 ? new Date(2024, 11, Math.floor(Math.random() * 17) + 1).toISOString().split('T')[0] : undefined,
      address: `${Math.floor(Math.random() * 9999) + 1} Main St, City, State ${Math.floor(Math.random() * 90000) + 10000}`,
      preferences: Math.random() > 0.5 ? 'High floor, non-smoking' : undefined,
    });
  }

  return guests.sort((a, b) => b.totalSpent - a.totalSpent);
};

const generateStaff = (): Staff[] => {
  const staff: Staff[] = [];
  const roles: Staff['role'][] = ['manager', 'front-desk', 'housekeeping', 'maintenance', 'concierge'];
  const shifts: Staff['shift'][] = ['morning', 'evening', 'night'];
  const statuses: Staff['status'][] = ['active', 'on-break', 'off-duty'];
  const firstNames = ['Emily', 'James', 'Maria', 'David', 'Sophie', 'Michael', 'Lisa', 'Robert', 'Anna', 'Thomas',
                      'Jennifer', 'William', 'Jessica', 'Daniel', 'Michelle', 'Christopher', 'Ashley', 'Matthew', 'Sarah', 'Joseph'];
  const lastNames = ['Davis', 'Wilson', 'Garcia', 'Chen', 'Anderson', 'Martinez', 'Taylor', 'Moore', 'Jackson', 'Brown',
                     'Johnson', 'Williams', 'Jones', 'Miller', 'Smith', 'Thompson', 'White', 'Lopez', 'Lee', 'Harris'];

  for (let i = 1; i <= 20; i++) {
    const firstName = firstNames[i - 1];
    const lastName = lastNames[i - 1];
    const role = roles[Math.floor(Math.random() * roles.length)];

    staff.push({
      id: `${i}`,
      name: `${firstName} ${lastName}`,
      role,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@glimmora.com`,
      phone: `+1 (555) 100-${String(i).padStart(4, '0')}`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      shift: shifts[Math.floor(Math.random() * shifts.length)],
      hireDate: new Date(2018 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1).toISOString().split('T')[0],
      salary: role === 'manager' ? 85000 :
              role === 'front-desk' ? 45000 :
              role === 'concierge' ? 48000 :
              role === 'housekeeping' ? 38000 : 42000,
    });
  }

  return staff;
};

export function AdminProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>(() => generateBookings());
  const [rooms, setRooms] = useState<Room[]>(() => generateRooms());
  const [guests, setGuests] = useState<Guest[]>(() => generateGuests());
  const [staff, setStaff] = useState<Staff[]>(() => generateStaff());

  const totalRevenue = bookings.filter(b => b.paymentStatus === 'paid').reduce((sum, b) => sum + b.totalAmount, 0);
  const totalBookings = bookings.filter(b => b.status !== 'cancelled').length;
  const totalGuests = guests.length;

  const stats = {
    todayCheckIns: bookings.filter(b => b.checkIn === new Date().toISOString().split('T')[0] && b.status !== 'cancelled').length,
    todayCheckOuts: bookings.filter(b => b.checkOut === new Date().toISOString().split('T')[0] && b.status !== 'cancelled').length,
    todayRevenue: bookings.filter(b =>
      b.checkIn === new Date().toISOString().split('T')[0] &&
      b.status !== 'cancelled' &&
      b.paymentStatus === 'paid'
    ).reduce((sum, b) => sum + b.totalAmount, 0),
    occupancyRate: Math.round((rooms.filter(r => r.status === 'occupied').length / rooms.length) * 100),
    availableRooms: rooms.filter(r => r.status === 'available').length,
    totalRooms: rooms.length,
    pendingPreCheckins: bookings.filter(b => b.status === 'confirmed' && !b.preCheckinCompleted).length,
    totalRevenue,
    revenueChange: 12,
    totalBookings,
    bookingsChange: 8,
    occupancyChange: 5,
    totalGuests,
    guestsChange: 15,
  };

  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 72000 },
    { month: 'Jun', revenue: 85000 },
  ];

  const roomTypeData = [
    { type: 'Standard', revenue: 25000, count: 85, percent: 20 },
    { type: 'Deluxe', revenue: 35000, count: 65, percent: 28 },
    { type: 'Ocean View', revenue: 42000, count: 55, percent: 33 },
    { type: 'Executive', revenue: 24000, count: 30, percent: 19 },
  ];

  const addBooking = (bookingData: Omit<Booking, 'id' | 'bookingNumber' | 'createdAt'>) => {
    const newId = (Math.max(...bookings.map(b => parseInt(b.id))) + 1).toString();
    const newBookingNumber = `BK-2024-${String(parseInt(bookings[0].bookingNumber.split('-')[2]) + 1).padStart(3, '0')}`;

    const newBooking: Booking = {
      ...bookingData,
      id: newId,
      bookingNumber: newBookingNumber,
      createdAt: new Date().toISOString(),
    };

    setBookings([newBooking, ...bookings]);
    console.log('Booking added:', newBooking);
  };

  const updateBooking = (id: string, data: Partial<Booking>) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, ...data } : b));
    console.log('Booking updated:', id, data);
  };

  const deleteBooking = (id: string) => {
    setBookings(bookings.filter(b => b.id !== id));
    console.log('Booking deleted:', id);
  };

  const addRoom = (roomData: Omit<Room, 'id'>) => {
    const newRoom: Room = {
      ...roomData,
      id: roomData.roomNumber,
    };

    setRooms([...rooms, newRoom]);
    console.log('Room added:', newRoom);
  };

  const updateRoom = (id: string, data: Partial<Room>) => {
    setRooms(rooms.map(r => r.id === id ? { ...r, ...data } : r));
    console.log('Room updated:', id, data);
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter(r => r.id !== id));
    console.log('Room deleted:', id);
  };

  const addGuest = (guestData: Omit<Guest, 'id'>) => {
    const newId = (Math.max(...guests.map(g => parseInt(g.id))) + 1).toString();

    const newGuest: Guest = {
      ...guestData,
      id: newId,
    };

    setGuests([...guests, newGuest]);
    console.log('Guest added:', newGuest);
  };

  const updateGuest = (id: string, data: Partial<Guest>) => {
    setGuests(guests.map(g => g.id === id ? { ...g, ...data } : g));
    console.log('Guest updated:', id, data);
  };

  const addStaff = (staffData: Omit<Staff, 'id'>) => {
    const newId = (Math.max(...staff.map(s => parseInt(s.id))) + 1).toString();

    const newStaff: Staff = {
      ...staffData,
      id: newId,
    };

    setStaff([...staff, newStaff]);
    console.log('Staff added:', newStaff);
  };

  const updateStaff = (id: string, data: Partial<Staff>) => {
    setStaff(staff.map(s => s.id === id ? { ...s, ...data } : s));
    console.log('Staff updated:', id, data);
  };

  const updateStaffStatus = (id: string, status: Staff['status']) => {
    updateStaff(id, { status });
  };

  return (
    <AdminContext.Provider
      value={{
        bookings,
        rooms,
        guests,
        staff,
        stats,
        revenueData,
        roomTypeData,
        addBooking,
        updateBooking,
        deleteBooking,
        addRoom,
        updateRoom,
        deleteRoom,
        addGuest,
        updateGuest,
        addStaff,
        updateStaff,
        updateStaffStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within AdminProvider');
  }
  return context;
}
