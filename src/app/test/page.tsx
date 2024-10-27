import { getTestData } from "@/api/test";
import BacktestChart from "@/components/charts/trades-chart";

export default async function Page() {
    const data = await getTestData();

    return (
        <div className="min-h-screen overflow-scroll flex flex-col">
            <BacktestChart />
        </div>
    );
}