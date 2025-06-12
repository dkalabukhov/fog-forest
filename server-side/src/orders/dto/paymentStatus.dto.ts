export class PaymentAmountDto {
  value: string;
  currency: string;
}

export class PaymentRecipientDto {
  account_id: string;
  gateway_id: string;
}

export class PaymentCardDto {
  first6: string;
  last4: string;
  expiry_year: string;
  expiry_month: string;
  card_type: string;
  card_product: {
    code: string;
  };
  issuer_country: string;
}

export class PaymentMethodDto {
  type: string;
  id: string;
  saved: boolean;
  status: string;
  title?: string;
  card?: PaymentCardDto;
}

export class AuthorizationDetailsDto {
  rrn: string;
  auth_code: string;
  three_d_secure: {
    applied: boolean;
    method_completed: boolean;
    challenge_completed: boolean;
  };
}

export class PaymentObjectDto {
  id: string;
  status: string;
  amount: PaymentAmountDto;
  income_amount?: PaymentAmountDto;
  description: string;
  recipient: PaymentRecipientDto;
  payment_method: PaymentMethodDto;
  created_at: string;
  expires_at?: string;
  captured_at?: string;
  test: boolean;
  paid: boolean;
  refundable: boolean;
  refunded_amount?: PaymentAmountDto;
  metadata: Record<string, any>;
  authorization_details: AuthorizationDetailsDto;
}

export class PaymentStatusDto {
  type: string;
  event: string;
  object: PaymentObjectDto;
}
