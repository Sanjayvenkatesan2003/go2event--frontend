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
  
  transformStyle: string = 'transform: translateY(-200%);';
  bgColor: string = 'background-color: black;';

  ngOnChanges(changes: SimpleChanges): void {
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
  }

  closeNotification() {
    this.transformStyle = 'transform: translateY(-200%);';
  }
}
