
//Data-handling
async function getDataAsync(endpoint) {
    let response = await fetch(localHost + endpoint);
    let data = await response.json()
    return data;
}
function addData(endpoint, object) {

    // Gör en fetch med localhost och endpointen
    // Inkludera det objektet(skall vara färdigbyggt)
    fetch(localHost + endpoint, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(object),
    })
        .then(response => response.json())
        .then(object => {
            console.log("Success!!", object)
        })
        .catch((error) => {
            console.log(error)
        });
};
//Take an endpoint and an id.
function deleteData(endpoint, id) {
    fetch(localHost + endpoint + "/" + id, {
        method: "DELETE",
    })
        .then(response => response.json());
    location.reload();
};


function updateData(endpoint, data) {
    console.log(data.id)
    fetch(localHost + endpoint + "/" + data.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then(object => {
            console.log("Success!!", object)
            return object;
        })
        .catch((error) => {
            console.log(error)
        });
}