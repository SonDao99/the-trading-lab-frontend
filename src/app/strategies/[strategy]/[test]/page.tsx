import { getTestData } from "@/api/test";
import CandlestickChart from "@/components/charts/candlestick-chart";

export default async function Page({ params }: { params: { test: string } }) {
  console.log(params.test);
  const data = await getTestData();

  return (
    <div className="min-h-screen overflow-scroll flex flex-col">
      <CandlestickChart data={data} />
    </div>
  );
}