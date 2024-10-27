import type { ReactElement } from "react";
import { redirect } from "next/navigation";

export default function Home(): ReactElement {
  redirect("/strategies");
  return <main></main>;
}
