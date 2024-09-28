import { getTestData } from "@/api/test";
import NameChanger from "./NameChanger";

export default async function Page() {
  const data = await getTestData();
  const displayData = JSON.stringify(data);

  return (
    <div>
      <NameChanger />
      <div>{displayData}</div>
    </div>
  );
}
