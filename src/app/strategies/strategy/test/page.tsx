import { getTestData } from "@/api/test";
import NameChanger from "./NameChanger";
import CandlestickChart from "@/components/charts/candlestick-chart";

export default async function Page() {
  const data = await getTestData();
  // const displayData = JSON.stringify(data);

  return (
    <div className="min-h-screen overflow-scroll flex flex-col">
      <NameChanger />
      <CandlestickChart data={data} />
    </div>
  );
}
