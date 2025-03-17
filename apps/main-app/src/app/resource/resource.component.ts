import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { UserResourceBaseComponent } from './user-resource-base';
import { UserResourceComponent } from './user-resource.component';
import { UserRxResourceComponent } from './user-rx-resource.component';
import { UserHttpResourceComponent } from './user-http-resource.component';

@Component({
  selector: 'df-resource',
  imports: [
    MatTab,
    MatTabGroup,
    UserResourceBaseComponent,
    UserResourceComponent,
    UserRxResourceComponent,
    UserHttpResourceComponent,
  ],
  template: `
    <mat-tab-group>
      <mat-tab label="Base Resource">
        <df-user-resource-base />
      </mat-tab>
      <mat-tab label="Resource">
        <df-user-resource />
      </mat-tab>
      <mat-tab label="RxResource">
        <df-user-rx-resource />
      </mat-tab>
      <mat-tab label="HttpResource">
        <df-user-http-resource />
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
export class ResourceComponent {}
