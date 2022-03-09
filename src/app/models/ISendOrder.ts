import { IMovie } from './IMovie';

export interface ISendOrder {
  companyId?: number;
  createdBy?: string;
  created?: string;
  totalPrice?: number;
  paymentMethod?: string;
  orderRows?: ISendOrderRow[];
}

export interface ISendOrderRow {
  productId?: number;
  amount: number;
}
