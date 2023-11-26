import { Component, Input } from "@angular/core";
import { AssetData } from "src/app/core/models/asset.models";

@Component({
  selector: 'app-asset-table',
  templateUrl: './asset-table.component.html',
  styleUrls: ['./asset-table.component.scss'],
})
export class AssetTableComponent {
  @Input() formattedAssetData: AssetData[] = [];
  @Input() tableStyle: any; // Adicione esta linha para a propriedade tableStyle
  noData: any;

  constructor() {}
}
