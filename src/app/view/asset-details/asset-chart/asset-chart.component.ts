import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-asset-chart',
  templateUrl: './asset-chart.component.html',
  styleUrls: ['./asset-chart.component.scss'],
})
export class AssetChartComponent implements OnChanges {
  @Input() data: any;
  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        type: 'linear',
      },
    },
  };
  chartType: ChartType = 'line';

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.data) {
      this.chartConfig();
    }
  }

  chartConfig(): void {
    const documentStyle = getComputedStyle(document.documentElement);

    this.chartOptions.scales = {
      x: {
        type: 'linear',
      },
    };

    this.chartOptions.plugins = {
      legend: {
        labels: {
          color: documentStyle.getPropertyValue('--blue-500'),
        },
      },
    };

    this.chartOptions.elements = {
      point: {
        backgroundColor: documentStyle.getPropertyValue('--blue-500'),
      },
      line: {
        borderColor: documentStyle.getPropertyValue('--blue-500'),
        backgroundColor: 'rgba(0, 0, 0, 0)',
      },
    };
  }
}
