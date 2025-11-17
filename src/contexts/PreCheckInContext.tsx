import { createContext, useContext, useState, ReactNode } from 'react';

export interface PreCheckInData {
  bookingNumber: string;
  guestName: string;
  roomType: string;
  checkInDate: string;
  checkOutDate: string;
  personalInfo: {
    email: string;
    phone: string;
    address: string;
    city: string;
    zipCode: string;
    country: string;
  };
  roomPreferences: {
    floor: 'low' | 'mid' | 'high' | 'any';
    view: 'ocean' | 'city' | 'garden' | 'any';
    bedType: 'king' | 'queen' | 'twin' | 'any';
    quietness: 'quiet' | 'moderate' | 'any';
  };
  selectedRoom?: {
    number: string;
    floor: number;
    view: string;
    aiScore: number;
    aiReasoning: string[];
  };
  travelDetails: {
    arrivalTime: string;
    flightNumber: string;
    purpose: 'business' | 'leisure' | 'event' | 'other';
    transportationNeeded: boolean;
  };
  documents: {
    idFrontUrl?: string;
    idBackUrl?: string;
    idType: 'passport' | 'drivers-license' | 'national-id';
  };
  preferences: {
    pillowType: string[];
    temperature: number;
    minibarPreferences: string[];
    dietaryRestrictions: string[];
  };
  specialRequests: {
    requests: string;
    earlyCheckIn: boolean;
    lateCheckOut: boolean;
  };
  digitalKey?: {
    keyId: string;
    activated: boolean;
    qrCode: string;
  };
}

interface PreCheckInContextType {
  preCheckInData: PreCheckInData;
  updatePreCheckInData: (data: Partial<PreCheckInData>) => void;
  resetPreCheckIn: () => void;
}

const PreCheckInContext = createContext<PreCheckInContextType | undefined>(undefined);

const initialData: PreCheckInData = {
  bookingNumber: '',
  guestName: '',
  roomType: '',
  checkInDate: '',
  checkOutDate: '',
  personalInfo: {
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    country: '',
  },
  roomPreferences: {
    floor: 'any',
    view: 'any',
    bedType: 'any',
    quietness: 'any',
  },
  travelDetails: {
    arrivalTime: '',
    flightNumber: '',
    purpose: 'leisure',
    transportationNeeded: false,
  },
  documents: {
    idType: 'passport',
  },
  preferences: {
    pillowType: [],
    temperature: 72,
    minibarPreferences: [],
    dietaryRestrictions: [],
  },
  specialRequests: {
    requests: '',
    earlyCheckIn: false,
    lateCheckOut: false,
  },
};

export function PreCheckInProvider({ children }: { children: ReactNode }) {
  const [preCheckInData, setPreCheckInData] = useState<PreCheckInData>(initialData);

  const updatePreCheckInData = (data: Partial<PreCheckInData>) => {
    setPreCheckInData((prev) => ({ ...prev, ...data }));
  };

  const resetPreCheckIn = () => {
    setPreCheckInData(initialData);
  };

  return (
    <PreCheckInContext.Provider value={{ preCheckInData, updatePreCheckInData, resetPreCheckIn }}>
      {children}
    </PreCheckInContext.Provider>
  );
}

export function usePreCheckIn() {
  const context = useContext(PreCheckInContext);
  if (!context) {
    throw new Error('usePreCheckIn must be used within PreCheckInProvider');
  }
  return context;
}
