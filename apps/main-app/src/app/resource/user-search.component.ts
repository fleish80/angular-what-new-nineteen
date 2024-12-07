import { Component, resource, signal } from '@angular/core';
import { MatProgressBar } from '@angular/material/progress-bar';
import { User } from './user.model';
import { API_URL } from './config'

@Component({
  selector: 'df-user-search',
  imports: [MatProgressBar],
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
    }
    @if (users.error()) {
      <div class="error">{{ users.error() }}</div>
    }
    <section class="actions">
      <button (click)="users.reload()">Reload</button>
      <button (click)="addUser()">Add User</button>
      <button (click)="users.set([])">Clear</button>
    </section>
    <ul>
      @for (user of users.value(); track user.id) {
        <li>{{ user.name }}</li>
      } @empty {
        <li class="no-data">Nothing to show</li>
      }
    </ul>
  `,
})
export class UserSearchComponent {
  query = signal('');
  users = resource<User[], { query: string }>({
    request: () => ({ query: this.query() }),
    loader: async ({ request, abortSignal }) => {
      const users = await fetch(`${API_URL}?name_like=^${request.query}`, {
        signal: abortSignal,
      });
      if (!users.ok) throw Error(`Could not fetch...`);
      return await users.json();
    },
  });
  addUser() {
    const user = { id: 123, name: 'Dmytro Mezhenskyi' };
    this.users.update((users) => (users ? [user, ...users] : [user]));
  }
}
