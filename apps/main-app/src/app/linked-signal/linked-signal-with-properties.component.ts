import { Component, linkedSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'df-linked-signal-with-properties',
  imports: [CommonModule, MatButton],
  template: `
    <label for="first-name">First Name:</label>
    <input
      id="first-name"
      #firstNameInput
      (input)="setFirstName(firstNameInput.value)"
      placeholder="First Name"
      [value]="firstName()"
    />

    <label for="last-name">First Name:</label>
    <input
      id="last-name"
      #lastNameInput
      (input)="setLastName(lastNameInput.value)"
      placeholder="Last Name"
      [value]="lastName()"
    />

    <p>{{ fullName() }}</p>

    <button (click)="selCustomName('Custom', 'Name')" mat-flat-button>
      Set Full Custom Name
    </button>
  `,
  styles: ``,
})
export class LinkedSignalWithPropertiesComponent {
  firstName = signal<string>('John');
  lastName = signal<string>('Doe');

  fullName = linkedSignal({
    source: () => ({
      firstName: this.firstName(),
      lastName: this.lastName(),
    }),
    computation: (newVal, prevVal) => {
      console.log('newVal = ', newVal, ', ', 'prevVal = ', prevVal);
      return `${newVal.firstName} ${newVal.lastName}`;
    },
    equal: (a, b) => {
      console.log('a = ', a, ', ', 'b = ', b, ', ', 'a !== b => ', a !== b);
      return a === b;
    },
  });

  setFirstName(text: string) {
    this.firstName.set(text);
  }

  setLastName(text: string) {
    this.lastName.set(text);
  }

  selCustomName(firstName: string, lastName: string) {
    this.fullName.set(`${firstName} ${lastName}`);
  }
}
