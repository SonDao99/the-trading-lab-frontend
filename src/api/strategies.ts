import { getRequest, postRequest} from "@/utils/requests";


const apiURL = process.env["NEXT_PUBLIC_API_URL"]

export const getStrategies = async () => {
  
  const url = `${apiURL}/strategies/user/101007466203640277268`;
  //const url = `http://localhost:8080/strategies/user/101007466203640277268`;
  const data = await getRequest(url);
  return data;
};

export const postStrategy = async (
  userId: string,
  name: string,
  prompt: string
) => {
  const url = `http://localhost:8080/strategies`;
  const data = await postRequest(url, {
    name: name,
    prompt: prompt,
    userId: userId,
  });
  return data;
};
