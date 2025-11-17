import { z } from 'zod';

export const bookingWidgetSchema = z
  .object({
    checkIn: z.date({
      required_error: 'Check-in date is required',
    }),
    checkOut: z.date({
      required_error: 'Check-out date is required',
    }),
    adults: z
      .number()
      .min(1, 'At least 1 adult is required')
      .max(10, 'Maximum 10 adults'),
    children: z.number().min(0).max(5, 'Maximum 5 children'),
    infants: z.number().min(0).max(2, 'Maximum 2 infants'),
    specialRequests: z.string().max(500, 'Maximum 500 characters').optional(),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: 'Check-out must be after check-in',
    path: ['checkOut'],
  })
  .refine(
    (data) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return data.checkIn >= today;
    },
    {
      message: 'Check-in date must be today or in the future',
      path: ['checkIn'],
    }
  );

export const createBookingSchema = z.object({
  roomId: z.string().min(1, 'Room is required'),
  checkIn: z.string().min(1, 'Check-in date is required'),
  checkOut: z.string().min(1, 'Check-out date is required'),
  guests: z.number().min(1, 'At least 1 guest is required'),
  specialRequests: z.string().max(500).optional(),
});

// Type exports
export type BookingWidgetFormData = z.infer<typeof bookingWidgetSchema>;
export type CreateBookingFormData = z.infer<typeof createBookingSchema>;
