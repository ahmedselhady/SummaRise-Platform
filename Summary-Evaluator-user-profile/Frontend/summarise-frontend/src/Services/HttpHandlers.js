

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