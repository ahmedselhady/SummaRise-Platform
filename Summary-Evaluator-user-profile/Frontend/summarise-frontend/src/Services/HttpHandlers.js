

export function POST(url, route, body) {

    return fetch(url + route, {
        method: 'POST',
        //mode: "no-cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    });

}

export function POST_AUTH(url, route, body, token) {

    return fetch(url + route, {
        method: 'POST',
        //mode: "no-cors",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(body)
    });

}

export function AUTH(url, route, email, password) {


    const authString = email + ':' + password;

    return fetch(url + route, {
        method: 'POST',
        auth: {
            "username": email,
            "password": password
        },
    });

}

export function GET(url, route, token) {

    return fetch(url + route, {
        method: 'GET',
        //mode: "no-cors",
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
    });

}