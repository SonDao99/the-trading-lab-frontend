import { getRequest } from "@/utils/requests";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getStrategies = async (userid: string) => {
  const url = `${apiURL}/strategies/user/${userid}`;
  const data = await getRequest(url);
  return data;
};
