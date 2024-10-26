import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BacktestCardData } from "@/lib/constants";
import Link from "next/link";

export default function BacktestCard({
  backtest,
}: {
  backtest: BacktestCardData;
}) {
  return (
    <Link href={`/strategies/${backtest.strategy}/${backtest.id}`}>
      <Card
        key={backtest.id}
        className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors"
      >
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-white">
            {backtest.backtestName}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-lg">
          <p className="text-gray-400 mb-3">Stock: {backtest.stock}</p>
          <p className="text-gray-400 mb-3">Interval: {backtest.interval}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
