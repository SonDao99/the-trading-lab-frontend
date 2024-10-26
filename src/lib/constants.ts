export type StrategyCardData = {
  id: string;
  strategyName: string;
  // stocks: string[];
  // timeframe: string;
};

export type BacktestCardData = {
  id: string;
  strategy: string;
  backtestName: string;
  startTime: Date;
  endTime: Date;
  interval: string;
  stock: string;
};

export type StockSymbol = {
  symbol: string;
  name: string;
  currency: string;
  exchange: string;
  country: string;
  type: string;
  mic_code: string;
  figi_code: string;
};

export type StockData = {
  symbol: string;
  backtestId: string;
  strategyId: string;
  backtestname: string;
  strategyName: string;
  interval: string;
  stockPrices: {
    open: number;
    close: number;
    high: number;
    low: number;
    volume: number;
    id: number;
    symbol: string;
    time: string;
    backtest: number;
    balance: number;
    action: number;
    pctChange: number;
  }[];
};

export type TradeData = {
  symbol: string;
  backtestId: string;
  strategyId: string;
  backtestname: string;
  strategyName: string;
  interval: string;
  backtestData: {
    id: number;
    backtestId: number;
    trade: number;
    balance: number;
  }[];
};
