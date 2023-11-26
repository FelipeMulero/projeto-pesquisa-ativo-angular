import { Observable, of } from "rxjs";

export class YahooFinanceServiceMock {
    getAssetData(asset: string): Observable<any> {
      // Retorne um Observable simulado aqui com os dados desejados para os testes
      return of({
        timestamp: [/* dados simulados */],
        indicators: { quote: [{ open: [/* dados simulados */] }] },
        meta: { symbol: 'AAPL' },
      });
    }
  }
  