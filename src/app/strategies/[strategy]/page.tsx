import { getStrategy } from "@/api/strategy";
import BacktestCard from "@/components/backtest-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { BacktestCardData } from "@/lib/constants";
import { PlusCircle } from "lucide-react";
import Link from "next/link";
import ModifyStrategy from "./modify-strategy";

export default async function Strategy({
  params,
}: {
  params: { strategy: string };
}) {
  const response = await getStrategy(params.strategy);
  const backtests = response.backtests;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <CardTitle className="text-lg mb-4">
            Strategy: {response.strategyName}
          </CardTitle>
          <CardDescription className="text-base">
            Strategy ID: {response.id}
          </CardDescription>
        </div>
        <ModifyStrategy strategyID={response.id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-40">
        {backtests &&
          backtests.map((backtest: BacktestCardData) => (
            <BacktestCard key={backtest.id} backtest={backtest} />
          ))}

        <Link href={`/strategies/${response.id}/create-test`}>
          <Card className="bg-gray-900 border-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <CardContent className="text-center">
              <PlusCircle className="w-16 h-16 text-[#6b27c0] mt-4 mb-2 mx-auto" />
              <p className="text-2xl font-semibold text-white">
                Create New Backtest
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
