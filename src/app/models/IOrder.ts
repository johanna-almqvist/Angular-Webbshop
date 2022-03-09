import { IOrderRows } from "./IOrderRows";

export interface IOrder{
    id: number;
    companyId: number;
    created: Date;
    createdBy: string;
    paymentMethod: string;
    totalPrice: number;
    status: number;
    orderRows: IOrderRows[];
}