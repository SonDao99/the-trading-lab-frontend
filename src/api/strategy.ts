import {
  deleteRequest,
  getRequest,
  postRequest,
  putRequest,
} from "@/utils/requests";

const apiURL = "http://localhost:8080";

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

export const updateStrategy = async (
  strategyID: string,
  name: string,
  prompt: string,
  userId: string
) => {
  const url = `${apiURL}/strategies/${strategyID}`;
  const data = await putRequest(url, {
    name,
    prompt,
    userId,
  });
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
