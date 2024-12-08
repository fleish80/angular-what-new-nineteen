import { Component, linkedSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'df-linked-signal',
  imports: [CommonModule],
  template: `
    <input
      (input)="setFirstName($event)"
      placeholder="First Name"
      value="John"
    />
    <p>{{ fullName() }}</p>


    <input
      type="number"
      value="11"
      #emailInput
    />
    <button (click)="changEmailId(emailInput.valueAsNumber)">Change Email Id</button>
    <p>{{ email() }}</p>
  `,
  styles: ``,
})
export class LinkedSignalComponent {
  firstName = signal<string>('John');
  lastName = signal<string>('Doe');

  fullName = linkedSignal({
    source: this.firstName,
    computation: (newVal, prevVal) => {
      console.log('newVal = ', newVal, ', ', 'prevVal = ', prevVal);
      return `${newVal} ${this.lastName()}`;
    },
  });

  user = signal({ id: 11, name: 'Josh Dont' });
  email = linkedSignal<{ id: number, name: string }, string>({
    source: this.user,
    computation: (user ) => {
      console.log('user', user,);
      return `${user.name} ${user.id}@email.com`;
    },
    equal: (a: any, b: any) => {
      console.log('a = ', a, ', ', 'b = ', b, ', ', 'a !== b => ', a !== b);
      return a.id !== b.id;
    },
  });

  setFirstName($event: Event) {
    this.firstName.set(($event.target as HTMLInputElement).value);
  }

  changEmailId(newID: number) {
    this.user.update(u => ({ ...u, id: newID}));
  }


  constructor() {
    console.log('------------------------------------------------------------------');
    const shippingOptions = signal(['Ground', 'Air', 'Sea']);
    const selectedOption = linkedSignal(() => shippingOptions()[0]);
    console.log(selectedOption()); // 'Ground'
    selectedOption.set(shippingOptions()[2]);
    console.log(selectedOption()); // 'Sea'
    shippingOptions.set(['Email', 'Will Call', 'Postal service']);
    console.log(selectedOption()); // 'Email'
    console.log('------------------------------------------------------------------');
  }
}
