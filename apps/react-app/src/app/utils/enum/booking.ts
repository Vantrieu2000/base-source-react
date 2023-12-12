export enum BookingAttention {
  PROCESSING = 'processing',
  // USE_POINT = 'use_point',
  ON_REQUEST = 'on_request',
  NOMINATED = 'nominated',
  NEW_CUSTOMER = 'new_customer',
  CANCEL = 'cancel',
}

// export enum BookingStatus {
//   WAITING_CONFIRM = 'waiting_confirm',
//   WAITING_RECEPTION = 'waiting_reception',
//   IN_OPERATION = 'in_operation',
//   WAITING_VISIT = 'waiting_visit',
//   COMPLETE = 'completed',
// }

export enum BookingStatus {  
  PENDING = 'pending',
  WAITING_RECEPTION = 'waiting_reception',
  ONGOING = 'ongoing',
  COMPLETED_SERVICE = 'completed_service',
  PAID = 'paid',
  CANCELLED = 'cancelled',
  HOLDING = 'holding',
}

export enum BookingReservation {
  HOT_PEPPER_BEUTY='hot_pepper_beuty',
  GOOGLE_LISTING='google_listing',
  INTRODUCTION='introduction',
  HOT_PEPPER_BEAUTY='hot_pepper_beauty',
  HOMEPAGE='home_page',
  SINGBOARD='signboard',
  OTHER_STORE='from_order_store',
}

export enum BookingType {
  ATTENTION = 'attention',
  STATUS = 'status',
  RESERVATION = 'reservation'
}

export enum BookingMethod {
  PAYMENTED = 'paymented',
  CASH = 'cash',
  CREDIT_CARD = 'credit_card',
  LINE_PAY = 'line_pay',
  PAY_PAY = 'pay_pay',
  OTHER = 'other'
}
