import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { UserSearchComponent } from './resource/user-search.component';

@Component({
  imports: [RouterModule, MatTab, UserSearchComponent, MatTabGroup],
  selector: 'df-root',
  template: `
    <mat-tab-group>
      <mat-tab label="Resource"><df-user-search /></mat-tab>
    </mat-tab-group>
  `,
  styles: ``,
})
export class AppComponent {
}
