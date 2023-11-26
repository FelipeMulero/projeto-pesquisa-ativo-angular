import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetDetailsComponent } from './asset-details/asset-details.component';

const routes: Routes = [
  {
    path: '',
    component: AssetDetailsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssetRoutingModule {}
