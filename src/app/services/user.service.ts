/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type UserRole = 'Admin' | 'Editor' | 'Viewer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
}

export interface UserFormData {
  name: string;
  email: string;
  role: UserRole;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSubject = new BehaviorSubject<User[]>([
    { id: '1', name: 'James Wilson', email: 'james.wilson@example.com', role: 'Admin', createdAt: new Date().toISOString() },
    { id: '2', name: 'Sarah Jenkins', email: 'sarah.j@example.com', role: 'Editor', createdAt: new Date().toISOString() },
    { id: '3', name: 'Michael Chen', email: 'm.chen@dev.io', role: 'Viewer', createdAt: new Date().toISOString() },
    { id: '4', name: 'Elena Rodriguez', email: 'elena.r@agency.com', role: 'Editor', createdAt: new Date().toISOString() },
  ]);

  public users$: Observable<User[]> = this.usersSubject.asObservable();

  public addUser(data: UserFormData): void {
    const newUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      ...data,
      createdAt: new Date().toISOString(),
    };
    const currentUsers = this.usersSubject.getValue();
    this.usersSubject.next([...currentUsers, newUser]);
  }

  public getUsersSync(): User[] {
    return this.usersSubject.getValue();
  }
}
