/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Component, ElementRef, Input, OnChanges, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User, UserRole } from '../../services/user.service';

@Component({
  selector: 'app-user-chart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="relative w-full h-[300px] flex items-center justify-center">
      @if (isLoading) {
        <div class="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10 transition-opacity">
          <div class="w-8 h-8 border-4 border-[#1c4980] border-t-transparent rounded-full animate-spin"></div>
        </div>
      }
      <canvas #chartCanvas></canvas>
    </div>
  `
})
export class UserChartComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() users: User[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart: any;
  isLoading = true;

  ngOnChanges() {
    if (this.chart) {
      this.updateChart();
    }
  }

  async ngAfterViewInit() {
    await this.initChart();
  }

  private async initChart() {
    // Lazy load Chart.js library as per requirement
    const { Chart, PieController, ArcElement, Tooltip, Legend } = await import('chart.js');
    
    Chart.register(PieController, ArcElement, Tooltip, Legend);

    if (!this.chartCanvas) return;

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'pie',
      data: this.getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 20,
              font: {
                family: "'Inter', sans-serif",
                size: 12,
              }
            }
          },
        },
      },
    });
    
    this.isLoading = false;
  }

  private updateChart() {
    if (this.chart) {
      this.chart.data = this.getChartData();
      this.chart.update();
    }
  }

  private getChartData() {
    const roleCounts: Record<UserRole, number> = {
      Admin: 0,
      Editor: 0,
      Viewer: 0,
    };

    this.users.forEach((user) => {
      roleCounts[user.role]++;
    });

    return {
      labels: ['Admin', 'Editor', 'Viewer'],
      datasets: [
        {
          data: [roleCounts.Admin, roleCounts.Editor, roleCounts.Viewer],
          backgroundColor: [
            '#1c4980', // Admin - Blue
            '#383838', // Editor - Dark Gray
            '#94a3b8', // Viewer - Light Gray
          ],
          borderWidth: 0,
        },
      ],
    };
  }

  ngOnDestroy() {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
