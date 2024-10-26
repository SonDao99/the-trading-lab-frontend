import { getRequest, postRequest } from "@/utils/requests";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getStrategies = async (userid: string) => {
  const url = `${apiURL}/strategies/user/${userid}`;
  const data = await getRequest(url);
  return data;
};

export const postStrategy = async (
  userid: string,
  name: string,
  prompt: string
) => {
  const url = `${apiURL}/strategies/user/${userid}`;
  const data = await postRequest(url, {
    name: name,
    prompt: prompt,
    userid: userid,
  });
  return data;
};
