import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AssetChart, ResultData } from '../models/asset.models';

@Injectable({
  providedIn: 'root',
})
export class YahooFinanceService {
  private readonly apiUrl = '/v8/finance/chart/';
  private readonly defaultRange = '1mo';
  private readonly defaultInterval = '1d';

  constructor(private readonly http: HttpClient) {}

  getAssetData(asset: string): Observable<ResultData> {
    const params = new HttpParams()
      .set('symbol', asset)
      .set('range', this.defaultRange)
      .set('interval', this.defaultInterval);

    return this.http
      .get<AssetChart>(`${this.apiUrl}${asset}`, { params })
      .pipe(
        map((search) => search.chart.result[0]),
        catchError(this.handleError)
      );
  }

  private handleError(error: any): Observable<never> {
    console.error('Erro ao buscar dados do ativo:', error);
    return throwError('Erro ao buscar dados do ativo. Tente novamente mais tarde.');
  }
}
