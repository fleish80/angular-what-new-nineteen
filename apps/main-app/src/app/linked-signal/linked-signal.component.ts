import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { LinkedSignalNoPropertiesComponent } from './linked-signal-no-properties.component';
import { LinkedSignalWithPropertiesComponent } from './linked-signal-with-properties.component';

@Component({
  selector: 'df-linked-signal',
  imports: [
    MatTab,
    MatTabGroup,
    LinkedSignalNoPropertiesComponent,
    LinkedSignalWithPropertiesComponent,
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="No Properties">
        <df-linked-signal-no-properties />
      </mat-tab>
      <mat-tab label="With Properties">
        <df-linked-signal-with-properties
        />
      </mat-tab>
    </mat-tab-group>
  `,
  styles: `
    :host {
      display: block;
      margin-inline: 100px;
      margin-block: 20px;
      background-color: var(--mat-sys-inverse-primary);
      --mdc-tab-indicator-active-indicator-color: var(--mat-sys-on-primary-fixed);
      --mdc-tab-indicator-focus-indicator-color: var(--mat-sys-on-primary-fixed);
      box-shadow: 0 0 10px 5px var(--mat-sys-on-primary-fixed);
      border-radius: 21px;
      padding-inline: 10px;
    }

  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LinkedSignalComponent {}
