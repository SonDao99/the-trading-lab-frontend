// @ts-ignore
export const getRequest = async (url) => {

    const token = await getToken();
    const session = await getSession();
    

    const response = await fetch(url, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Cookie': `MYSESSIONID=${session}`
        },
        credentials: 'include',
        cache: 'no-store',
        method: 'GET'
    });
  
    if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
    }

    return await response.json();
};


export const getToken = async () => {
  const response = await fetch(`http://localhost:8080/token`, {credentials: "include", cache: "no-store", method: "GET"});
  return await response.text();
}

export const getSession = async () => {
  const response = await fetch(`http://localhost:8080/session`, {credentials: "include", cache: "no-store", method: "GET"});
  return await response.text();
}

export const getUserId = async () => {
    const response = await fetch(`http://localhost:8080/home`, {credentials: "include", cache: "no-store", method: "GET"});
    const data = await response.json();
    return data.userId;
}


// @ts-ignore
export const postRequest = async (url: string, body: object) => {

    const token = await getToken();
    const session = await getSession();

    const response = await fetch(url, {
    method: "POST",
    credentials: 'include',
    cache: 'no-store',
    headers: {
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`,
      'Cookie': `MYSESSIONID=${session}`
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const putRequest = async (url: string, body: object) => {

    const token = await getToken();
    const session = await getSession();

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
        'Cookie': `MYSESSIONID=${session}`
    },
    body: JSON.stringify(body),
    cache: "no-cache",
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const deleteRequest = async (url: string) => {
    const token = await getToken();
    const session = await getSession();

    const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`,
        'Cookie': `MYSESSIONID=${session}`
    },
    cache: "no-cache",
    credentials: 'include'
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.status;
};
