export const getRequest = async (url, token, session) => {
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


export const postRequest = async (url: string, token, session, body: object) => {
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
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const putRequest = async (url: string, body: object) => {
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.json();
};

export const deleteRequest = async (url: string) => {
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error(`Response status: ${response.status}`);
  }

  return response.status;
};
