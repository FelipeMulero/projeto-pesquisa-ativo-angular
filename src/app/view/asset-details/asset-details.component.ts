import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { Subscription } from 'rxjs';
import { AssetData } from 'src/app/core/models/asset.models';
import { YahooFinanceService } from 'src/app/core/services/yahoo-finance.service';
import { AssetTableComponent } from './asset-table/asset-table.component';
import { AssetChartComponent } from './asset-chart/asset-chart.component';
import { SearchBarComponent } from './asset-form/search-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [
    ButtonModule,
    TableModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    ChartModule,
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  selector: 'app-home',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent implements OnInit, OnDestroy {
  @ViewChild(SearchBarComponent) searchBar!: SearchBarComponent;
  @ViewChild(AssetTableComponent) assetTable!: AssetTableComponent;
  @ViewChild(AssetChartComponent) assetChart!: AssetChartComponent;
  
  
  assetForm!: FormGroup;
  private subs: Subscription[] = [];
  public assetData: AssetData[] = [];
  public assetDateArray: string[] = [];
  public formattedCurrencyArray: number[] = [];
  public valuePreviousDay!: number;
  displayedColumns: string[] = ['day', 'date', 'value', 'variationPreviousDay', 'variationComparedToFirstDay'];

  data: any;

  constructor(
    private readonly fb: FormBuilder,
    private readonly homeService: YahooFinanceService
  ) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.assetForm = this.fb.group({
      asset: [null, Validators.required],
    });
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
  
  getAssetAndChart(asset: string): void {
    this.subs.push(
      this.homeService.getAssetData(asset).subscribe({
        next: (response) => {
          const { timestamp, indicators, meta } = response;
          const assetDatesArray = timestamp;
          const assetValuesArray = indicators.quote[0].open;
          const assetSymbol = meta.symbol;
          this.assetDataAccordingToTable(assetDatesArray, assetValuesArray, assetSymbol);
        },
        error: () => {},
        complete: () => {},
      })
    );
  }
  
  assetDataAccordingToTable(assetDatesArray: number[], assetValuesArray: number[], assetSymbol: string): void {
    assetDatesArray.forEach((assetDate, index) => {
      const assetValueInTheFirstDay = assetValuesArray[0];
      const assetCurrentValue = assetValuesArray[index];
  
      this.formatAssetDateAccordingToChartAndPopulateCurrencyArray(assetDate, assetCurrentValue, assetSymbol);
  
      const tableObject = {
        day: index + 1,
        date: assetDate,
        value: assetCurrentValue,
        variationPreviousDay: assetCurrentValue - this.valuePreviousDay,
        variationComparedToFirstDay: assetCurrentValue - assetValueInTheFirstDay,
      };
      this.valuePreviousDay = tableObject.value;
      this.assetData.push(tableObject);
    });
  }

  submitAsset(): void {
    const formData = this.assetForm.get('asset')?.value;
    this.resetData();
    this.getAssetAndChart(formData);
  }
  
  formatAssetDateAccordingToChartAndPopulateCurrencyArray(assetDate: number, assetCurrentValue: number, symbol: string): void {
    const date = new Date(assetDate * 1000);
    const formattedDate = `${this.padNumber(date.getUTCDay())}/${this.padNumber(date.getUTCMonth())}/${date.getUTCFullYear()}`;
    this.assetDateArray.push(formattedDate);
  
    this.formattedCurrencyArray.push(assetCurrentValue);
    this.chartConfig(this.assetDateArray, symbol);
  }
  
  chartConfig(assetDatesArray: string[], symbol: string): void {
    const documentStyle = getComputedStyle(document.documentElement);
  
    this.data = {
      labels: assetDatesArray,
      datasets: [
        {
          label: `Ativo: ${symbol}`,
          data: this.formattedCurrencyArray,
          fill: false,
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          tension: 0.4,
        },
      ],
    };
  }
  
  resetData(): void {
    this.assetData = [];
    this.assetDateArray = [];
    this.formattedCurrencyArray = [];
    this.valuePreviousDay = 0;
  }
  
  ngOnDestroy(): void {
    this.subs.forEach((item) => item.unsubscribe());
  }
}