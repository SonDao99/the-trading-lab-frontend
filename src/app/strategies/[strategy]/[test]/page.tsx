import { getStockPrices, getTrades } from "@/api/test";
import CandlestickChart from "@/components/charts/candlestick-chart";
import { StockData, TradeData } from "@/lib/constants";

export default async function Page({
  params,
}: {
  params: { strategy: string; test: string };
}) {
  // const data = await getTestData();
  const stockData: StockData = await getStockPrices(params.test);
  const tradeData: TradeData = await getTrades(params.test);
  console.log(tradeData);

  return (
    <div className="h-full flex">
      <CandlestickChart data={stockData} />
    </div>
  );
}
