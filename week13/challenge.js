const key = "RAK8KC-TDGHPL-ANGHE4-4HKJ";
window.onload = function() {
    request.get("https://www.n2yo.com/rest/v1/satellite/", {
        'auth': {
            'user': 'username',
            'pass': key
        }
    })
}

async function makeRequest(url) {
    let response = await fetch(url)
    let data = response.json()

    return data
}