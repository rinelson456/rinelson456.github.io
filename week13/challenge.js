const key = "RAK8KC-TDGHPL-ANGHE4-4HKJ";
const baseURLTLE = "https://www.n2yo.com/rest/v1/satellite/tle/"
const baseURLPos = "https://www.n2yo.com/rest/v1/satellite/positions/"
const heroku = "https://cors-anywhere.herokuapp.com/"

let location = document.getElementById("location");

async function makeRequest(url) {
    let response = await fetch(url)
    let data = response.json()

    return data
}

window.onload = function() {

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

        showSpinner();

    } else {
        x.innerHTML = "Geolocation is not supported by this browser, but you can still look up satellite names!";
        let tle = 0;
        if (document.getElementById("NORAD").value == undefined) {
            tle = 1;
        } else {
            tle = document.getElementById("NORAD").value;
        }

        showSpinner();

        makeRequest(heroku + baseURLTLE + `${tle}&apiKey=${key}`).then(satellite => {
            displaySattellites(satellite);
        })
    }
}

function showPosition(position) {
    let observerLat = position.coords.latitude;
    let observerLong = position.coords.longitude;
    let observerAlt = document.getElementById("altitude").value
    const seconds = 1;

    let tle = 25544;
    if (document.getElementById("NORAD").value == undefined) {
        tle = 25544;
    } else {
        tle = document.getElementById("NORAD").value;
    }
    makeRequest(heroku + baseURLPos + `${tle}/${observerLat}/${observerLong}/${observerAlt}/${seconds}&apiKey=${key}`).then(satellite => {
        displaySattellites(satellite);
    })
    location.innerHTML = "Your Latitude: " + position.coords.latitude +
        "<br>Your Longitude: " + position.coords.longitude;
}

document.getElementById("submit").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);

        showSpinner();

    } else {
        x.innerHTML = "Geolocation is not supported by this browser, but you can still look up satellite names!";
        let tle = 25544;
        if (document.getElementById("NORAD").value == undefined) {
            tle = 25544;
        } else {
            tle = document.getElementById("NORAD").value;
        }

        showSpinner();

        makeRequest(baseURLTLE + `${tle}&apiKey=${key}`).then(satellite => {
            displaySattellites(satellite);
        })
    }
})

function displaySattellites(satellite) {
    hideSpinner();
    let display = document.querySelector("#satellites")
    let newSatellite = document.createElement("div")
    newSatellite.className = 'satellite'

    if (satellite.positions[0].sataltitude > 0) {
        newSatellite.innerHTML += `<div id="satelliteName">${satellite.info.satname}<br>
        Satellite ID: ${satellite.info.satid}<br>
        Satellite Altitude (in kilometers): ${satellite.positions[0].sataltitude}<br>
        Satellite Latitude: ${satellite.positions[0].satlatitude}<br>
        Satellite Longitude: ${satellite.positions[0].satlongitude}</div><br>`
    } else {
        newSatellite.innerHTML += `<div id="satelliteName">${satellite.info.satname}<br>
    Satellite ID: ${satellite.info.satid}<br>
    Satellite Altitude (in kilometers): ${satellite.positions[0].sataltitude}<br>
    Satellite Latitude: ${satellite.positions[0].satlatitude}<br>
    Satellite Longitude: ${satellite.positions[0].satlongitude}<br>
    <p style="color:red">This satellite has decayed out of orbit!<p></div><br>`
    }

    display.appendChild(newSatellite)
}

const spinner = document.getElementById("loader");

function showSpinner() {
    spinner.className = "show";
    setTimeout(() => {
        spinner.className = spinner.className.replace("show", "");
    }, 15000);
}

function hideSpinner() {
    spinner.className = spinner.className.replace("show", "");
}

let myNodelist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < myNodelist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}

let close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
    }
}