import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StrategyCardData } from "@/lib/constants";

export default function StrategyCard({
  strategy,
}: {
  strategy: StrategyCardData;
}) {
  return (
    <Card
      key={strategy.id}
      className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-colors"
    >
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-white">
          {strategy.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-lg">
        <p className="text-gray-400 mb-3">Strategy ID: {strategy.id}</p>
        <p className="text-gray-400 mb-3">
          Stocks: {strategy.stocks.join(", ")}
        </p>
        <p className="text-gray-400">Timeframe: {strategy.timeframe}</p>
      </CardContent>
    </Card>
  );
}
