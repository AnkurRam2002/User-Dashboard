/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, X } from 'lucide-angular';
import { UserFormData, UserRole } from '../../services/user.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  animations: [
    trigger('overlay', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0 }))
      ])
    ]),
    trigger('modal', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translate(-50%, -40%) scale(0.95)' }),
        animate('300ms cubic-bezier(0.34, 1.56, 0.64, 1)', style({ opacity: 1, transform: 'translate(-50%, -50%) scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translate(-50%, -45%) scale(0.95)' }))
      ])
    ])
  ],
  template: `
    @if (isOpen) {
      <div class="fixed inset-0 z-[60]">
        <div 
          @overlay 
          class="fixed inset-0 bg-black/60 backdrop-blur-sm" 
          (click)="onClose.emit()"
        ></div>
        
        <div 
          @modal 
          class="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        >
          <div class="p-6 border-b border-gray-100 flex justify-between items-center bg-[#f8f9fa]">
            <h2 class="text-xl font-semibold text-[#383838]">Add New User</h2>
            <button 
              (click)="onClose.emit()"
              class="p-2 hover:bg-gray-200 rounded-full transition-colors"
              id="close-modal-btn"
            >
              <lucide-icon name="x" size="20" class="text-gray-500"></lucide-icon>
            </button>
          </div>
          
          <form (ngSubmit)="handleSubmit()" #userForm="ngForm" class="p-8 space-y-6">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 ml-1 uppercase tracking-wider text-[10px]">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter full name"
                [(ngModel)]="formData.name"
                #nameModel="ngModel"
                [class.border-red-500]="nameModel.invalid && nameModel.touched"
                class="w-full h-[48px] px-4 rounded-xl border border-gray-200 focus:border-[#1c4980] focus:ring-2 focus:ring-[#1c4980]/20 transition-all outline-none"
                id="user-name-input"
              />
              @if (nameModel.invalid && nameModel.touched) {
                <p class="text-xs text-red-500 mt-1 ml-1">Name is required</p>
              }
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 ml-1 uppercase tracking-wider text-[10px]">Email Address</label>
              <input
                type="email"
                name="email"
                required
                email
                placeholder="name@company.com"
                [(ngModel)]="formData.email"
                #emailModel="ngModel"
                [class.border-red-500]="emailModel.invalid && emailModel.touched"
                class="w-full h-[48px] px-4 rounded-xl border border-gray-200 focus:border-[#1c4980] focus:ring-2 focus:ring-[#1c4980]/20 transition-all outline-none"
                id="user-email-input"
              />
              @if (emailModel.invalid && emailModel.touched) {
                <p class="text-xs text-red-500 mt-1 ml-1">Valid email is required</p>
              }
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700 ml-1 uppercase tracking-wider text-[10px]">Access Role</label>
              <select
                name="role"
                required
                [(ngModel)]="formData.role"
                class="w-full h-[48px] px-4 rounded-xl border border-gray-200 focus:border-[#1c4980] focus:ring-2 focus:ring-[#1c4980]/20 transition-all outline-none appearance-none bg-white font-medium"
                id="user-role-select"
              >
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>

            <div class="pt-4">
              <button
                type="submit"
                [disabled]="userForm.invalid"
                class="w-full h-[48px] bg-[#1c4980] text-white font-semibold rounded-xl hover:bg-[#153a66] active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                id="submit-user-btn"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    }
  `
})
export class UserFormComponent {
  @Input() isOpen = false;
  @Output() onClose = new EventEmitter<void>();
  @Output() onSubmit = new EventEmitter<UserFormData>();

  formData: UserFormData = {
    name: '',
    email: '',
    role: 'Viewer'
  };

  readonly XIcon = X;

  handleSubmit() {
    this.onSubmit.emit({ ...this.formData });
    this.formData = { name: '', email: '', role: 'Viewer' };
    this.onClose.emit();
  }
}
