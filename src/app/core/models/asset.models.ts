export interface CurrentTradingPeriod {
  pre: TradingPeriodDetails;
  regular: TradingPeriodDetails;
  post: TradingPeriodDetails;
}

export interface TradingPeriodDetails {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface TradingPeriod {
  timezone: string;
  start: number;
  end: number;
  gmtoffset: number;
}

export interface IndicatorsAssetsCharts {
  quote: Data[];
}

export interface Data {
  volume: number[];
  low: number[];
  high: number[];
  open: number[];
  close: number[];
}

export interface AssetData {
  day?: number;
  date: string | number;
  value: number;
  variationPreviousDay?: number;
  variationComparedToFirstDay?: number;
}

export interface AssetChart {
  chart: ChartData;
}

export interface ChartData {
  result: ResultData[];
  error: any;
}

export interface ResultData {
  meta: MetaData;
  timestamp: number[];
  indicators: IndicatorsAssetsCharts;
}

export enum DataGranularity {
  DAY = '1d',
  WEEK = '1wk',
  MONTH = '1mo',
}

export interface MetaData {
  currency: string;
  symbol: string;
  exchangeName: string;
  instrumentType: string;
  firstTradeDate: number;
  regularMarketTime: number;
  gmtoffset: number;
  timezone: string;
  exchangeTimezoneName: string;
  regularMarketPrice: number;
  chartPreviousClose: number;
  previousClose: number;
  scale: number;
  priceHint: number;
  currentTradingPeriod: CurrentTradingPeriod;
  tradingPeriods: TradingPeriod[];
  dataGranularity: DataGranularity;
  range: string;
  validRanges: string[];
}
