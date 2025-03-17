import { Component, linkedSignal, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'df-linked-signal-no-properties',
  imports: [CommonModule, FormsModule, MatButton],
  template: `
    <label for="shipping-select">Select Shipping Option:</label>
    <select
      id="shipping-select"
      #shippingSelect
      [value]="selectedOption()"
      (change)="onSelectChange(shippingSelect.value)"
    >
      @for (option of shippingOptions(); track option) {
      <option [value]="option">
        {{ option }}
      </option>
      }
    </select>
    <p>Selected option: {{ selectedOption() }}</p>
    <button (click)="updateShippingOptions()" mat-flat-button>
      Update Options
    </button>
  `,
  styles: `

    :host {
      margin-inline: 20px;
      margin-block: 20px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    select {
      padding-inline: 5px;
      padding-block: 5px;
      font-size: 14px;
    }

  `,
})
export class LinkedSignalNoPropertiesComponent {
  // Signal holding the list of shipping options.
  shippingOptions = signal(['Ground', 'Air', 'Sea']);

  // Linked signal that initially takes the first shipping option.
  selectedOption = linkedSignal(() => this.shippingOptions()[0]);

  // Linked signal with property

  // selectedOption = linkedSignal({
  //   source: this.shippingOptions,
  //   computation: (shippingOptions) => shippingOptions[0],
  // });

  // Handler for when the user selects a different option.
  onSelectChange(shippingOption: string) {
    this.selectedOption.set(shippingOption);
  }

  updateShippingOptions() {
    this.shippingOptions.set(['Email', 'Will Call', 'Postal service']);
  }
}
