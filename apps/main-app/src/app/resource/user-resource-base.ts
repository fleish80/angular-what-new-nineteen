import {
  ChangeDetectionStrategy,
  Component,
  resource,
  signal,
} from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from './user.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'df-user-resource-base',
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
    } @if (users.error()) {
    <div class="error">{{ users.error() }}</div>
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
  }`,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserResourceBaseComponent {
  query = signal('');

  users = resource<User[], { query: string }>({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      const users = await fetch(
        `https://jsonplaceholder.typicode.com/users?name_like=${request.query}`
      );
      return await users.json();
    },
  });

  addUser() {
    const user = { id: 123, name: 'Some User' };
    this.users.update((users) => (users ? [user, ...users] : [user]));
  }
}
