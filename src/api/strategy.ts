import { deleteRequest, getRequest, postRequest } from "@/utils/requests";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getStrategy = async (strategyID: string) => {
  const url = `${apiURL}/strategies/${strategyID}`;
  const data = await getRequest(url);
  return data;
};

export const deleteStrategy = async (strategyID: string) => {
  const url = `${apiURL}/strategies/${strategyID}`;
  const data = await deleteRequest(url);
  return data;
};

export const getSymbols = async () => {
  const url = `${apiURL}/backtest/symbols`;
  const data = await getRequest(url);
  return data;
};

export const postBacktest = async (
  name: string,
  strategyId: string,
  interval: string,
  symbol: string,
  startTime: string
) => {
  const url = `${apiURL}/backtest`;
  const data = await postRequest(url, {
    name,
    strategyId,
    interval,
    symbol,
    startTime,
  });
  return data;
};
