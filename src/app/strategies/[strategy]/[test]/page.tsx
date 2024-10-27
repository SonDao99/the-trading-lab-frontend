import { getStockPrices, getTrades } from "@/api/test";
import CandlestickChart from "@/components/charts/candlestick-chart";
import { CardTitle } from "@/components/ui/card";
import { StockData, TradeData } from "@/lib/constants";
import DeleteTest from "./delete-test";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: { strategy: string; test: string };
}) {
  // const data = await getTestData();
  const stockData: StockData = await getStockPrices(params.test);
  const tradeData: TradeData = await getTrades(params.test);

  return (
    <div className="h-full flex flex-col p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <CardTitle className="text-lg mb-4">
            Backtest: {stockData.backtestName}
          </CardTitle>
          <div className="text-base flex gap-8">
            <p>
              Strategy Name:{" "}
              <Link
                href={`/strategies/${params.strategy}`}
                className="text-blue-600 visited:text-purple-600"
              >
                {stockData.strategyname}
              </Link>
            </p>
            <p>Backtest ID: {stockData.backtestId}</p>
            <p>Symbol: {stockData.symbol}</p>
            <p>Interval: {stockData.interval}</p>
          </div>
        </div>
        <DeleteTest strategyID={params.strategy} testID={params.test} />
      </div>
      <div className="flex">
        <CandlestickChart data={stockData.stockPrices} />
      </div>
    </div>
  );
}
