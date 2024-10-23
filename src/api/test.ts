import { getRequest } from "@/utils/requests";

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

export const getTestData = async () => {
  const url = `https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=5min&apikey=${apiKey}`;
  const data = await getRequest(url);
  return data;
};
