const TokenService = {
    async getTokenAndSession() {
        const response = await fetch('/token', { //change permissions in BE
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();

        sessionStorage.setItem('access_token', data.token);
        sessionStorage.setItem('session_id', data.sessionId);

        return data;
    },

    getStoredToken() {
        return sessionStorage.getItem('access_token');
    },

    getStoredSessionId() {
        return sessionStorage.getItem('session_id');
    },

};

export default TokenService;
