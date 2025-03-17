import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { User } from './user.model';
import { httpResource } from '@angular/common/http';

@Component({
  selector: 'df-user-http-resource',
  imports: [MatProgressBar, MatButton],
  template: `
    <fieldset>
      <legend>Users Search</legend>
      <input
        (input)="query.set($any($event.target).value)"
        type="search"
        placeholder="Search..."
      />
    </fieldset>

    @if (users.isLoading()) {
    <mat-progress-bar mode="query" />
    } @if (users.error(); as error) {
    <div class="error">{{ error }}</div>
    } @else {
    <ul>
      @for (user of users.value(); track user.id) {
      <li>{{ user.name }}</li>
      } @empty {
      <li class="no-data">Nothing to show</li>
      }
    </ul>
    }
    <section class="actions">
      <button mat-flat-button (click)="users.reload()">Reload</button>
      <button mat-flat-button (click)="addUser()">Add User</button>
      <button mat-flat-button (click)="users.set([])">Clear</button>
    </section>
  `,
  styles: `
    .actions {
      display: flex;
      gap: 10px;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserHttpResourceComponent {
  query = signal('');

  users = httpResource<User[]>(
    () => `https://jsonplaceholder.typicode.com/users?name_like=${this.query()}`
  );

  addUser() {
    const user = { id: 123, name: 'Some User' };
    this.users.update((users) => (users ? [user, ...users] : [user]));
  }
}
