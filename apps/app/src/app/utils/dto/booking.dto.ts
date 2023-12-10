export interface BookingDto {
  id: string;
  email: string;
  fullName: string;
  type: {};
  roleId: string;
  storeId: string;
  phoneNumber: string;
  userCode: string;
  status: {};
  province: string;
  district: string;
  address: string;
  age: 0;
  gender: {};
  avatar: string;
  dob: string;
  createDate: string;
  role: {
    id: string;
    name: string;
  };
  store: {
    id: string;
  };
  countBooking: {};
  sumPaymentAmount: {};
  customerHistories: [string];
  profile: string;
  expertise: string;
  procedure: string;
  control: string;
  isHot: true;
  isNew: true;
  flagSchedule: true;
  rating: 0;
  trainerSchedules: [{}];
  bookings: [
    {
      id: string;
      status: string;
      pricing: number;
      firstBooking: boolean;
      bookingMethod: string;
      usingTicket: null;
      introductionChannel: string;
      memo: null;
      paymentMethod: string;
      trainerComment: string;
      scheduledTime: Date;
      totalTime: number;
      isConsecutiveBooking: boolean;
    }
  ];
  disableTheBookingTime: [string];
  disableTheStoreTime: [string];
}

export interface CreateBookingDto {}

export interface UpdateBookingDto {
  id: string;
}

export interface CreatePlanDto {
  trainerId: string;
  startTime: string;
  endTime: string;
  status: string;
  memo: string;
  oldStartTime: string;
  oldEndTime: string;
}

export interface WorkTimeDto {
  normalTime: string;
  weekendTime: string;
  holidayTime: string;
}

export interface BookingBillDto {
  paymentMethod: string;
  moneyReceived: number;
  moneyRefund: number;
  isConsecutiveBooking: boolean;
}
