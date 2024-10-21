import { Ticket } from "../ticket/ticket.model";

export interface User {
  id?:number;
  name:string;
  email:string;
  password:string;
  tickets:Ticket[];
}
