import { Component, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  @Input('msg') msg: string = '';

  @Input('type') type: string = '';

  @Input('ran') randomNumber: number = 0;
  
  transformStyle: string = 'transform: translateY(0%);';
  bgColor: string = 'background-color: black;';
  timerId:any = 0;
  
  ngOnChanges(changes: SimpleChanges): void {
    clearTimeout(this.timerId);
    if(this.type === 'success') {
      this.bgColor = 'background-color: green;';
      this.transformStyle = 'transform: translateY(0%);';
    } else if(this.type === 'warning') {
      this.bgColor = 'background-color: yellow;';
      this.transformStyle = 'transform: translateY(0%);';
    } else if(this.type === 'error') {
      this.bgColor = 'background-color: red';
      this.transformStyle = 'transform: translateY(0%);';
    }

    this.timerId = setTimeout(()=>{
      this.transformStyle = 'transform: translateY(-200%);';
    },3000);
  }

  closeNotification():void {
    clearTimeout(this.timerId);
    this.transformStyle = 'transform: translateY(-200%);';
  }
}
