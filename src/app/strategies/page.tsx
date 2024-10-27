import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import StrategyCard from "@/components/strategy-card";
import { StrategyCardData } from "@/lib/constants";
import Link from "next/link";
import { getStrategies } from "@/api/strategies";
import { getToken, getSession} from "@/utils/requests";

export default async function TradingStrategyHomepage() {

    const [tokenData, sessionData] = await Promise.all([getToken(), getSession()]);
    console.log("TOKEN PAGE: " + tokenData);
    console.log("SESSION PAGE: " + sessionData);

    const strategies = await getStrategies(tokenData, sessionData);
  
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome back, <span className="text-[#6b27c0]">Test User</span>
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Create new strategies or click on an existing strategy to see more
        details
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-40">
        {strategies &&
          strategies.map((strategy: StrategyCardData) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}

        <Link href={"/create-strategy"}>
          <Card className="bg-gray-900 border-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <CardContent className="text-center">
              <PlusCircle className="w-16 h-16 text-[#6b27c0] mt-4 mb-2 mx-auto" />
              <p className="text-2xl font-semibold text-white">
                Add New Strategy
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  );
}
