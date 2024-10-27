import { getRequest, postRequest} from "@/utils/requests";

const apiURL = "http://localhost:8080";

export const getStrategies = async (token, sessionId) => {
  
  // const url = `${apiURL}/strategies/user/${userid}`;
  
  const url = `http://localhost:8080/strategies/user/101007466203640277268`;
  
  const data = await getRequest(url, token, sessionId);
  return data;
};

export const postStrategy = async (
  userid: string,
  name: string,
  prompt: string,
  token,
  sessionId
) => {
  const url = `http://localhost:8080/strategies/user/101007466203640277268`;
  const data = await postRequest(url, token, sessionId, {
    name: name,
    prompt: prompt,
    userid: userid,
  });
  return data;
};
