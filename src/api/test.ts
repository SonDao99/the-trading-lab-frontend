import { deleteRequest, getRequest } from "@/utils/requests";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getStockPrices = async (backtestID: string) => {
  const url = `${apiURL}/backtest/${backtestID}/stockprices`;
  const data = await getRequest(url);
  return data;
};

export const getTrades = async (backtestID: string) => {
  const url = `${apiURL}/backtest/${backtestID}/trades`;
  const data = await getRequest(url);
  return data;
};

export const deleteTest = async (backtestID: string) => {
  const url = `${apiURL}/backtest/${backtestID}`;
  const data = await deleteRequest(url);
  return data;
};
