import { createContext, useContext, useState, ReactNode } from 'react';

export interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  roomType: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'confirmed' | 'checked-in' | 'checked-out' | 'cancelled';
  totalAmount: number;
  paymentStatus: 'paid' | 'pending' | 'refunded';
}

export interface Room {
  id: string;
  number: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance' | 'cleaning';
  price: number;
  floor: number;
  amenities: string[];
}

export interface Guest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  nationality: string;
  totalBookings: number;
  totalSpent: number;
  vipStatus: boolean;
  joinedDate: string;
}

export interface Staff {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'active' | 'on-leave' | 'inactive';
  hireDate: string;
}

export interface Stats {
  totalRevenue: number;
  revenueChange: number;
  totalBookings: number;
  bookingsChange: number;
  occupancyRate: number;
  occupancyChange: number;
  totalGuests: number;
  guestsChange: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  bookings: number;
}

export interface RoomTypeData {
  type: string;
  count: number;
  revenue: number;
  [key: string]: string | number;
}

interface AdminContextType {
  stats: Stats;
  bookings: Booking[];
  rooms: Room[];
  guests: Guest[];
  staff: Staff[];
  revenueData: RevenueData[];
  roomTypeData: RoomTypeData[];
  updateBookingStatus: (bookingId: string, status: Booking['status']) => void;
  updateRoomStatus: (roomId: string, status: Room['status']) => void;
  updateStaffStatus: (staffId: string, status: Staff['status']) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider = ({ children }: AdminProviderProps) => {
  const [stats] = useState<Stats>({
    totalRevenue: 487250,
    revenueChange: 12.5,
    totalBookings: 342,
    bookingsChange: 8.2,
    occupancyRate: 87.5,
    occupancyChange: 5.1,
    totalGuests: 1248,
    guestsChange: 15.3,
  });

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 'BK001',
      guestName: 'John Smith',
      guestEmail: 'john.smith@email.com',
      roomType: 'Ocean View Suite',
      roomNumber: '301',
      checkIn: '2025-11-20',
      checkOut: '2025-11-25',
      status: 'confirmed',
      totalAmount: 1750,
      paymentStatus: 'paid',
    },
    {
      id: 'BK002',
      guestName: 'Sarah Johnson',
      guestEmail: 'sarah.j@email.com',
      roomType: 'Presidential Suite',
      roomNumber: '501',
      checkIn: '2025-11-18',
      checkOut: '2025-11-22',
      status: 'checked-in',
      totalAmount: 3200,
      paymentStatus: 'paid',
    },
    {
      id: 'BK003',
      guestName: 'Michael Chen',
      guestEmail: 'mchen@email.com',
      roomType: 'Deluxe Room',
      roomNumber: '205',
      checkIn: '2025-11-19',
      checkOut: '2025-11-21',
      status: 'confirmed',
      totalAmount: 500,
      paymentStatus: 'pending',
    },
    {
      id: 'BK004',
      guestName: 'Emily Davis',
      guestEmail: 'emily.davis@email.com',
      roomType: 'Executive Suite',
      roomNumber: '402',
      checkIn: '2025-11-15',
      checkOut: '2025-11-17',
      status: 'checked-out',
      totalAmount: 1000,
      paymentStatus: 'paid',
    },
    {
      id: 'BK005',
      guestName: 'David Wilson',
      guestEmail: 'dwilson@email.com',
      roomType: 'Standard Room',
      roomNumber: '102',
      checkIn: '2025-11-22',
      checkOut: '2025-11-24',
      status: 'cancelled',
      totalAmount: 300,
      paymentStatus: 'refunded',
    },
  ]);

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 'R001',
      number: '101',
      type: 'Standard Room',
      status: 'available',
      price: 150,
      floor: 1,
      amenities: ['WiFi', 'TV', 'Mini Bar'],
    },
    {
      id: 'R002',
      number: '102',
      type: 'Standard Room',
      status: 'cleaning',
      price: 150,
      floor: 1,
      amenities: ['WiFi', 'TV', 'Mini Bar'],
    },
    {
      id: 'R003',
      number: '205',
      type: 'Deluxe Room',
      status: 'occupied',
      price: 250,
      floor: 2,
      amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony'],
    },
    {
      id: 'R004',
      number: '301',
      type: 'Ocean View Suite',
      status: 'occupied',
      price: 350,
      floor: 3,
      amenities: ['WiFi', 'TV', 'Mini Bar', 'Ocean View', 'Balcony'],
    },
    {
      id: 'R005',
      number: '402',
      type: 'Executive Suite',
      status: 'available',
      price: 500,
      floor: 4,
      amenities: ['WiFi', 'TV', 'Mini Bar', 'Ocean View', 'Balcony', 'Living Room'],
    },
    {
      id: 'R006',
      number: '501',
      type: 'Presidential Suite',
      status: 'occupied',
      price: 800,
      floor: 5,
      amenities: ['WiFi', 'TV', 'Mini Bar', 'Ocean View', 'Balcony', 'Living Room', 'Kitchen'],
    },
    {
      id: 'R007',
      number: '105',
      type: 'Standard Room',
      status: 'maintenance',
      price: 150,
      floor: 1,
      amenities: ['WiFi', 'TV', 'Mini Bar'],
    },
    {
      id: 'R008',
      number: '210',
      type: 'Deluxe Room',
      status: 'available',
      price: 250,
      floor: 2,
      amenities: ['WiFi', 'TV', 'Mini Bar', 'Balcony'],
    },
  ]);

  const [guests] = useState<Guest[]>([
    {
      id: 'G001',
      fullName: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1-555-0101',
      nationality: 'USA',
      totalBookings: 5,
      totalSpent: 4250,
      vipStatus: true,
      joinedDate: '2024-06-15',
    },
    {
      id: 'G002',
      fullName: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1-555-0102',
      nationality: 'Canada',
      totalBookings: 8,
      totalSpent: 8900,
      vipStatus: true,
      joinedDate: '2024-03-22',
    },
    {
      id: 'G003',
      fullName: 'Michael Chen',
      email: 'mchen@email.com',
      phone: '+1-555-0103',
      nationality: 'China',
      totalBookings: 2,
      totalSpent: 1200,
      vipStatus: false,
      joinedDate: '2025-01-10',
    },
    {
      id: 'G004',
      fullName: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1-555-0104',
      nationality: 'UK',
      totalBookings: 4,
      totalSpent: 3400,
      vipStatus: false,
      joinedDate: '2024-08-05',
    },
    {
      id: 'G005',
      fullName: 'David Wilson',
      email: 'dwilson@email.com',
      phone: '+1-555-0105',
      nationality: 'Australia',
      totalBookings: 6,
      totalSpent: 5600,
      vipStatus: true,
      joinedDate: '2024-05-18',
    },
  ]);

  const [staff, setStaff] = useState<Staff[]>([
    {
      id: 'S001',
      name: 'Alice Thompson',
      role: 'Front Desk Manager',
      department: 'Reception',
      email: 'alice.t@glimmora.com',
      phone: '+1-555-1001',
      status: 'active',
      hireDate: '2023-01-15',
    },
    {
      id: 'S002',
      name: 'Robert Martinez',
      role: 'Concierge',
      department: 'Guest Services',
      email: 'robert.m@glimmora.com',
      phone: '+1-555-1002',
      status: 'active',
      hireDate: '2023-03-20',
    },
    {
      id: 'S003',
      name: 'Jessica Lee',
      role: 'Housekeeping Supervisor',
      department: 'Housekeeping',
      email: 'jessica.l@glimmora.com',
      phone: '+1-555-1003',
      status: 'active',
      hireDate: '2023-02-10',
    },
    {
      id: 'S004',
      name: 'Daniel Brown',
      role: 'Chef',
      department: 'Food & Beverage',
      email: 'daniel.b@glimmora.com',
      phone: '+1-555-1004',
      status: 'on-leave',
      hireDate: '2022-11-05',
    },
    {
      id: 'S005',
      name: 'Maria Garcia',
      role: 'Spa Manager',
      department: 'Spa & Wellness',
      email: 'maria.g@glimmora.com',
      phone: '+1-555-1005',
      status: 'active',
      hireDate: '2023-04-12',
    },
    {
      id: 'S006',
      name: 'James Wilson',
      role: 'Maintenance Technician',
      department: 'Maintenance',
      email: 'james.w@glimmora.com',
      phone: '+1-555-1006',
      status: 'active',
      hireDate: '2023-01-20',
    },
  ]);

  const [revenueData] = useState<RevenueData[]>([
    { month: 'Jan', revenue: 65000, bookings: 45 },
    { month: 'Feb', revenue: 59000, bookings: 38 },
    { month: 'Mar', revenue: 80000, bookings: 52 },
    { month: 'Apr', revenue: 81000, bookings: 58 },
    { month: 'May', revenue: 95000, bookings: 65 },
    { month: 'Jun', revenue: 105000, bookings: 72 },
    { month: 'Jul', revenue: 120000, bookings: 85 },
    { month: 'Aug', revenue: 115000, bookings: 78 },
    { month: 'Sep', revenue: 98000, bookings: 68 },
    { month: 'Oct', revenue: 87000, bookings: 62 },
    { month: 'Nov', revenue: 92000, bookings: 70 },
  ]);

  const [roomTypeData] = useState<RoomTypeData[]>([
    { type: 'Standard', count: 120, revenue: 180000 },
    { type: 'Deluxe', count: 85, revenue: 212500 },
    { type: 'Ocean View', count: 62, revenue: 217000 },
    { type: 'Executive', count: 48, revenue: 240000 },
    { type: 'Presidential', count: 12, revenue: 96000 },
  ]);

  const updateBookingStatus = (bookingId: string, status: Booking['status']) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  const updateRoomStatus = (roomId: string, status: Room['status']) => {
    setRooms((prev) =>
      prev.map((room) =>
        room.id === roomId ? { ...room, status } : room
      )
    );
  };

  const updateStaffStatus = (staffId: string, status: Staff['status']) => {
    setStaff((prev) =>
      prev.map((member) =>
        member.id === staffId ? { ...member, status } : member
      )
    );
  };

  return (
    <AdminContext.Provider
      value={{
        stats,
        bookings,
        rooms,
        guests,
        staff,
        revenueData,
        roomTypeData,
        updateBookingStatus,
        updateRoomStatus,
        updateStaffStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
