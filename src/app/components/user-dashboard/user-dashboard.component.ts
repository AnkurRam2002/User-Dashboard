/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, OnInit, OnDestroy, ViewChild, ViewContainerRef, ComponentRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Plus, LayoutDashboard, Users, PieChart as ChartIcon, Settings, LogOut, Bell } from 'lucide-angular';
import { trigger, transition, style, animate } from '@angular/animations';
import { Subscription } from 'rxjs';
import { User, UserService, UserFormData } from '../../services/user.service';
import { UserTableComponent } from '../user-table/user-table.component';
import { UserChartComponent } from '../user-chart/user-chart.component';

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, UserTableComponent, UserChartComponent],
  template: `
    <div class="flex min-h-screen bg-[#f4f7fa] text-[#383838] font-sans">
      <!-- Sidebar - Desktop -->
      <aside class="hidden lg:flex w-72 bg-white border-r border-gray-100 flex-col py-8 px-6 fixed h-full z-20">
        <div class="flex items-center gap-3 mb-12 px-2">
          <div class="w-10 h-10 bg-[#1c4980] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#1c4980]/20">
            <lucide-icon name="layout-dashboard" size="24"></lucide-icon>
          </div>
          <span class="font-bold text-xl tracking-tight text-[#1c4980]">NexusCloud</span>
        </div>

        <nav class="flex-1 space-y-2">
          <button class="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group bg-[#1c4980] text-white shadow-md shadow-[#1c4980]/10">
            <lucide-icon name="layout-dashboard" size="20"></lucide-icon>
            <span class="font-semibold text-sm">Overview</span>
            <div class="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
          </button>
        </nav>

        <div class="mt-auto pt-8 border-t border-gray-50 px-2">
          <button class="flex items-center gap-3 text-gray-400 hover:text-red-500 transition-colors w-full group">
            <div class="w-8 h-8 rounded-lg flex items-center justify-center group-hover:bg-red-50 transition-colors">
              <lucide-icon name="log-out" size="18"></lucide-icon>
            </div>
            <span class="font-medium text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 lg:ml-72 flex flex-col p-6 md:p-10 max-w-[1600px] mx-auto w-full">
        <!-- Header -->
        <header class="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-4">
          <div>
            <h1 class="text-3xl font-bold text-[#383838] mb-1">User Management</h1>
            <p class="text-gray-500 font-medium font-mono text-xs uppercase tracking-[0.2em]">Manage permissions and view distributions</p>
          </div>
          
          <div class="flex items-center gap-4">
            <button class="relative p-2 text-gray-400 hover:text-[#1c4980] transition-colors bg-white rounded-xl border border-gray-100 shadow-sm">
              <lucide-icon name="bell" size="22"></lucide-icon>
              <span class="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <button
              (click)="openModal()"
              class="h-[48px] px-6 bg-[#1c4980] text-white font-semibold rounded-xl hover:bg-[#153a66] active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#1c4980]/20"
              id="add-user-trigger"
            >
              <lucide-icon name="plus" size="20"></lucide-icon>
              Add User
            </button>
          </div>
        </header>

        <!-- Content Grid -->
        <div class="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
          <!-- Table Container -->
          <div class="xl:col-span-2 space-y-6">
            <section class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
               <div class="flex items-center justify-between mb-8">
                 <h2 class="text-lg font-bold">User Directory</h2>
                 <span class="text-xs bg-gray-100 text-gray-500 px-3 py-1 rounded-full font-bold">{{users.length}} Total</span>
               </div>
               <app-user-table [users]="users"></app-user-table>
            </section>
          </div>

          <!-- Stats / Charts Container -->
          <div class="xl:col-span-1 space-y-8">
             <section class="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm overflow-hidden relative">
               <div class="mb-6">
                 <h2 class="text-lg font-bold mb-1">Role Distribution</h2>
                 <p class="text-sm text-gray-400">Proportional access levels</p>
               </div>
               
               <app-user-chart [users]="users"></app-user-chart>
             </section>

             <div 
               class="bg-[#1c4980] rounded-3xl p-8 text-white relative overflow-hidden group shadow-xl shadow-[#1c4980]/10"
             >
                <div class="relative z-10">
                   <h3 class="font-bold text-xl mb-2">Team Efficiency</h3>
                   <p class="text-[#94a3b8] text-sm mb-6 leading-relaxed">
                     Optimize your workflow by assigning specific roles to your team members. Need a customized role?
                   </p>
                   <button class="px-6 py-3 bg-white/10 hover:bg-white/20 transition-colors rounded-xl font-semibold text-sm backdrop-blur-md">
                     Learn More
                   </button>
                </div>
                <!-- Abstract shape -->
                <div class="absolute -right-12 -bottom-12 w-48 h-48 bg-white/5 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700"></div>
             </div>
          </div>
        </div>
      </main>

      <!-- Lazy Loaded Modal Container -->
      <ng-container #modalContainer></ng-container>
    </div>
  `,
})
export class UserDashboardComponent implements OnInit, OnDestroy {
  @ViewChild('modalContainer', { read: ViewContainerRef }) modalContainer!: ViewContainerRef;

  users: User[] = [];
  private subscription?: Subscription;
  private modalRef?: ComponentRef<any>;

  readonly PlusIcon = Plus;
  readonly LayoutIcon = LayoutDashboard;
  readonly UsersIcon = Users;
  readonly ChartIcon = ChartIcon;
  readonly SettingsIcon = Settings;
  readonly LogOutIcon = LogOut;
  readonly BellIcon = Bell;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.subscription = this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  async openModal() {
    // Dynamic import for Lazy Loading the component as requested
    const { UserFormComponent } = await import('../user-form/user-form.component');
    
    this.modalContainer.clear();
    this.modalRef = this.modalContainer.createComponent(UserFormComponent);
    
    // Set inputs
    this.modalRef.instance.isOpen = true;
    
    // Subscribe to outputs
    this.modalRef.instance.onClose.subscribe(() => this.closeModal());
    this.modalRef.instance.onSubmit.subscribe((data: UserFormData) => {
      this.userService.addUser(data);
      this.closeModal();
    });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.instance.isOpen = false;
      // Small timeout to allow animation to complete
      setTimeout(() => {
        this.modalContainer.clear();
        this.modalRef = undefined;
      }, 300);
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
