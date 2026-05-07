/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ApplicationConfig, provideZoneChangeDetection, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LucideAngularModule, Search, Filter, MoreHorizontal, User, Mail, Shield, Plus, LayoutDashboard, Users, PieChart, Settings, LogOut, Bell, X, ChevronLeft, ChevronRight } from 'lucide-angular';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter([]),
    provideAnimations(),
    importProvidersFrom(LucideAngularModule.pick({ Search, Filter, MoreHorizontal, User, Mail, Shield, Plus, LayoutDashboard, Users, PieChart, Settings, LogOut, Bell, X, ChevronLeft, ChevronRight }))
  ]
};
