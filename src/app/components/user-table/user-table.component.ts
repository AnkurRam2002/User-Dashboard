/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Search, Filter, MoreHorizontal, User as UserIcon, Mail, Shield } from 'lucide-angular';
import { User } from '../../services/user.service';

@Component({
  selector: 'app-user-table',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  template: `
    <div class="w-full space-y-6">
      <div class="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div class="relative w-full md:max-w-sm">
          <lucide-icon name="search" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"></lucide-icon>
          <input
            type="text"
            placeholder="Search by name or email..."
            [(ngModel)]="searchTerm"
            (input)="onSearchChange($any($event.target).value)"
            class="w-full h-[48px] pl-12 pr-4 rounded-xl border border-gray-200 bg-white focus:border-[#1c4980] focus:ring-2 focus:ring-[#1c4980]/20 transition-all outline-none"
            id="table-search-input"
          />
        </div>
        
        <div class="flex items-center gap-3 w-full md:w-auto">
          <div class="relative w-full md:w-44">
            <lucide-icon name="filter" class="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 z-10 pointer-events-none"></lucide-icon>
            <select
              [value]="roleFilter"
              (change)="onFilterChange($any($event.target).value)"
              class="w-full h-[48px] pl-12 pr-4 rounded-xl border border-gray-200 bg-white focus:border-[#1c4980] focus:ring-2 focus:ring-[#1c4980]/20 transition-all outline-none appearance-none font-medium text-sm"
              id="role-filter-select"
            >
              <option value="All">All Roles</option>
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto bg-white rounded-2xl border border-gray-100 shadow-sm">
        <table class="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr class="border-bottom border-gray-100 bg-[#f8f9fa]">
              <th class="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
              <th class="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-5 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            @for (user of filteredUsers; track user.id) {
              <tr class="hover:bg-gray-50/50 transition-colors group">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#1c4980] group-hover:bg-[#1c4980] group-hover:text-white transition-colors">
                      <lucide-icon name="user" size="18"></lucide-icon>
                    </div>
                    <div class="flex flex-col">
                      <span class="font-semibold text-[#383838] leading-tight">{{user.name}}</span>
                      <div class="flex items-center gap-1 text-[11px] text-gray-400">
                        <lucide-icon name="mail" size="10"></lucide-icon>
                        <span>{{user.email}}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <div class="flex items-center gap-2">
                     <lucide-icon name="shield" size="14" [ngClass]="{
                       'text-amber-500': user.role === 'Admin',
                       'text-blue-500': user.role === 'Editor',
                       'text-gray-400': user.role === 'Viewer'
                     }"></lucide-icon>
                     <span class="text-xs font-medium px-2.5 py-1 rounded-full" [ngClass]="{
                       'bg-amber-50 text-amber-700': user.role === 'Admin',
                       'bg-blue-50 text-blue-700': user.role === 'Editor',
                       'bg-gray-100 text-gray-600': user.role === 'Viewer'
                     }">
                       {{user.role}}
                     </span>
                  </div>
                </td>
                <td class="px-6 py-4">
                  <span class="flex items-center gap-1.5 text-xs text-green-600 font-medium">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                    Active
                  </span>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="4" class="px-6 py-20 text-center text-gray-400 italic">
                  No users found matching your criteria
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [
    `
    :host { display: block; width: 100%; }
    `
  ]
})
export class UserTableComponent {
  @Input() users: User[] = [];
  searchTerm: string = '';
  roleFilter: string = 'All';

  readonly SearchIcon = Search;
  readonly FilterIcon = Filter;
  readonly MoreIcon = MoreHorizontal;
  readonly UserIcon = UserIcon;
  readonly MailIcon = Mail;
  readonly ShieldIcon = Shield;

  get filteredUsers() {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                           user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesRole = this.roleFilter === 'All' || user.role === this.roleFilter;
      return matchesSearch && matchesRole;
    });
  }

  onSearchChange(value: string) {
    this.searchTerm = value;
  }

  onFilterChange(value: string) {
    this.roleFilter = value;
  }
}
