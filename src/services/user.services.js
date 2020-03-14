// import config from 'config';
import { authHeader } from '../services/auth-header';

const config = {
    apiUrl: "http://127.0.0.1",
    authUrl: "/kkk/kfakebackend/be1.php",
};

export const userService = {
    login,
    logout,
    getAll,
    loginTest,
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}${config.authUrl}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function loginTest(username, password) {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        // body: JSON.stringify({ username, password })
    };

    return fetch(`${config.apiUrl}${config.authUrl}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                // location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}