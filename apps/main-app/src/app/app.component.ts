import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { UserSearchComponent } from './resource/user-search.component';
import { LinkedSignalComponent } from './linked-signal/linked-signal.component';

@Component({
  imports: [
    RouterModule,
    MatTab,
    UserSearchComponent,
    MatTabGroup,
    LinkedSignalComponent,
  ],
  selector: 'df-root',
  template: `
    <mat-tab-group>
      <mat-tab label="Resource"><df-user-search /></mat-tab>
      <mat-tab label="Linked Signal"><df-linked-signal /></mat-tab>
    </mat-tab-group>
  `,
  styles: ``,
})
export class AppComponent {}
