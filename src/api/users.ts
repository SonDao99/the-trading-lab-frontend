import { getRequest, putRequest } from "@/utils/requests";

const apiURL = process.env.NEXT_PUBLIC_API_URL;

export const getUserInfo = async (userId: string) => {
  const url = `${apiURL}/users/${userId}`;
  const data = await getRequest(url);
  return data;
};

export const updateUserInfo = async (
  userId: string,
  firstName: string,
  lastName: string
) => {
  const url = `${apiURL}/users/${userId}`;
  const data = await putRequest(url, {
    userId,
    firstName,
    lastName,
  });
  return data;
};
