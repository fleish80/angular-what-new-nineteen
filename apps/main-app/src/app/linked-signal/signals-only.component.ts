import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'df-signals-only',
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
    <button (click)="updateShippingOptions()" mat-flat-button>Update Options</button>
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
export class SignalsOnlyComponent {
  // Signal holding the list of shipping options
  shippingOptions = signal(['Ground', 'Air', 'Sea']);

  // Signal for the selected option
  private selectedOptionSignal = signal(this.shippingOptions()[0]);

  // Computed signal that updates when either shippingOptions or selectedOption changes
  selectedOption = computed(() => {
    const options = this.shippingOptions();
    const selected = this.selectedOptionSignal();
    // Return the selected option if it exists in options, otherwise return first option
    return options.includes(selected) ? selected : options[0];
  });

  onSelectChange(shippingOption: string) {
    this.selectedOptionSignal.set(shippingOption);
  }

  updateShippingOptions() {
    this.shippingOptions.set(['Email', 'Will Call', 'Postal service']);
  }
}
