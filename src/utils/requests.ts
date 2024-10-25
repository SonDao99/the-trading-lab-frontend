export const getRequest = async (url: string, params: object = {}) => {
  try {
    const response = await fetch(url, { ...params });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export const postRequest = async (url: string, body: object) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    return response.status;
  } catch (error) {
    console.error(error);
  }
};
