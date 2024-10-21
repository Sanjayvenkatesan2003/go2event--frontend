import { Event } from "../event/event.model";
export interface Ticket {
  id?:number;
  event?:Event;
  numberOfSeats:number;
  purchaseDate:Date;
  purchaseTime:Date;
  amountPaid:number;
}
