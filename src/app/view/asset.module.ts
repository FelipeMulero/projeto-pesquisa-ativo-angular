import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AssetRoutingModule } from './asset-routing.module';
import { AssetTableComponent } from './asset-details/asset-table/asset-table.component';
import { SearchBarComponent } from './asset-details/asset-form/search-bar.component';
import { AssetChartComponent } from './asset-details/asset-chart/asset-chart.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  declarations: [
    AssetTableComponent,
    AssetChartComponent,
    SearchBarComponent
  ],
  imports: [
    CommonModule, 
    AssetRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    ButtonModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
})
export class AssetModule {}
