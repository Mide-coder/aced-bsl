import { PaymentStatus } from "@prisma/client";

// Payment Types

export interface IPayment {
  id: number;
  userId?: number;
  tempUserData?: ITempUserData;
  email: string;
  amount: number;
  tutorId: string;
  couponCode?: string;
  discount: number;
  status: PaymentStatus;
  paystackRef?: string;
  paystackTransId?: string;
  authorizationUrl?: string;
  accessCode?: string;
  paidAt?: Date;
  createdAt: Date;
}

export interface ITempUserData {
  name: string;
  email: string;
  bookingNote: string;
}

export interface IPaymentCreate {
  userId: number;
  email: string;
  amount: number;
  tutorId: string;
  tempUserData?: ITempUserData;
}

export interface IPaystackInitResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export interface IPaystackVerifyResponse {
  status: boolean;
  message: string;
  data: {
    id: number;
    status: string;
    reference: string;
    amount: number;
    paid_at: string;
    channel: string;
    currency: string;
    customer: {
      email: string;
    };
  };
}
