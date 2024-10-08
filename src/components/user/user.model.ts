import { Event } from "../event/event.model";

export interface User {
  id?:number;
  name:string;
  email:string;
  password:string;
  events:Event[];
}
