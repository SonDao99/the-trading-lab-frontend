import { getSymbols } from "@/api/strategy";
import CreateTestForm from "./create-test-form";
import { StockSymbol } from "@/lib/constants";

export default async function CreateTest({
  params,
}: {
  params: { strategy: string };
}) {
  const stocks = await getSymbols();

  return <CreateTestForm stocks={stocks.data} strategyID={params.strategy} />;
}
