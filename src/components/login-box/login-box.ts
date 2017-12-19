import { Component } from '@angular/core';

/**
 * Generated class for the LoginBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'login-box',
  templateUrl: 'login-box.html'
})
export class LoginBoxComponent {

  text: string;

  constructor() {
    console.log('Hello LoginBoxComponent Component');
    this.text = 'Hello World';
  }

}
