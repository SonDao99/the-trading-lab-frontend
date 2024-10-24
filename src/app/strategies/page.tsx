"use client";
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";
import StrategyCard from "@/components/strategy-card";
import { StrategyCardData } from "@/lib/constants";
import Link from "next/link";
import { getStrategies } from "@/api/strategies";

// Fake data before BE is plugged in
const mockStrategies = [
  {
    id: "STR001",
    name: "Strategy 1  - Tech Growth",
    stocks: ["AAPL", "GOOGL", "MSFT"],
    timeframe: "2020-2025",
  },
  {
    id: "STR002",
    name: "Strategy 2  - High Risk",
    stocks: ["JNJ", "PG", "KO"],
    timeframe: "2021-2026",
  },
  {
    id: "STR003",
    name: "Strategy 3  - Green Energy",
    stocks: ["TSLA", "NEE", "ENPH"],
    timeframe: "2022-2027",
  },
  {
    id: "STR004",
    name: "Strategy 1  - Tech Growth",
    stocks: ["AAPL", "GOOGL", "MSFT"],
    timeframe: "2020-2025",
  },
  {
    id: "STR005",
    name: "Strategy 2  - High Risk",
    stocks: ["JNJ", "PG", "KO"],
    timeframe: "2021-2026",
  },
  {
    id: "STR006",
    name: "Strategy 3  - Green Energy",
    stocks: ["TSLA", "NEE", "ENPH"],
    timeframe: "2022-2027",
  },
  {
    id: "STR007",
    name: "Strategy 1  - Tech Growth",
    stocks: ["AAPL", "GOOGL", "MSFT"],
    timeframe: "2020-2025",
  },
  {
    id: "STR008",
    name: "Strategy 2  - High Risk",
    stocks: ["JNJ", "PG", "KO"],
    timeframe: "2021-2026",
  },
  {
    id: "STR009",
    name: "Strategy 3  - Green Energy",
    stocks: ["TSLA", "NEE", "ENPH"],
    timeframe: "2022-2027",
  },
  {
    id: "STR010",
    name: "Strategy 1  - Tech Growth",
    stocks: ["AAPL", "GOOGL", "MSFT"],
    timeframe: "2020-2025",
  },
  {
    id: "STR011",
    name: "Strategy 2  - High Risk",
    stocks: ["JNJ", "PG", "KO"],
    timeframe: "2021-2026",
  },
  {
    id: "STR012",
    name: "Strategy 3  - Green Energy",
    stocks: ["TSLA", "NEE", "ENPH"],
    timeframe: "2022-2027",
  },
];

export default function TradingStrategyHomepage() {
  const [strategies, setStrategies] = useState();
  // const strategies: StrategyCardData[] = await getStrategies(
  //   "113053702607165718413"
  // );
  // console.log(strategies);
  // const strategies = await response.json();
  useEffect(() => {
    async function fetchPosts() {
      let res = await getStrategies("113053702607165718413");
      let data = await res.json();
      setStrategies(data);
    }
    fetchPosts();
  });

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-4">
        Welcome back, <span className="text-[#6b27c0]">Test User</span>
      </h1>
      <p className="text-xl text-gray-400 mb-8">
        Some inspirational trading quote idk lol
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {strategies &&
          strategies.map((strategy: StrategyCardData) => (
            <StrategyCard key={strategy.id} strategy={strategy} />
          ))}

        <Link href={"/develop-strategy"}>
          <Card className="bg-gray-900 border-gray-800 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors">
            <CardContent className="text-center">
              <PlusCircle className="w-16 h-16 text-[#6b27c0] mb-6 mx-auto" />
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
