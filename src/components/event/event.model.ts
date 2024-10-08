export interface Event {
  id?:number;
  name:string;
  description:string;
  type:string;
  venue:string;
  ticketPrice:number;
  totalSeats:number;
  availableSeats:number;
  date:Date;
  time:Date;
  duration:Date;
}
