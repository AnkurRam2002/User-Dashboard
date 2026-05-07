/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component } from '@angular/core';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [UserDashboardComponent],
  template: `
    <div class="antialiased selection:bg-[#1c4980]/10 selection:text-[#1c4980]">
      <app-user-dashboard></app-user-dashboard>
    </div>
  `
})
export class AppComponent {}
