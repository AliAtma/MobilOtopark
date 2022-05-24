var selectedPark = false
const Markers = []

function initMap() {
    const location = {lat:41.041841, lng: 29.006107};
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: location
    })

    selectedPark = parks[0].id
    for (let i = 0; i < parks.length; i++) {
        console.log(typeof parks[i].coords, parks[i].coords)
        let marker = new google.maps.Marker({
            position: JSON.parse(parks[i].coords),   
            map: map,
            title: parks[i].name,
        })
        marker.addListener("click", function() {
            map.setZoom(15)
            map.setCenter(this.getPosition())
            changeDisplayPark(this.title)
        })
        Markers.push(marker)
    }

    let innerHTML = ""
    for (let i = 0; i < vehicles.length; i++) {
        if (!vehicles[i].currentpark) {
            innerHTML += `<div class="reserve-vehicle-entry" onclick="createReservation(${vehicles[i].id})">${vehicles[i].plate} ${vehicles[i].name}</div>`
        }
    }
    document.getElementById("reserve-window").innerHTML = innerHTML

    setTimeout(() => {
        map.panTo(Markers[0].getPosition())
    }, 2500)
}

function changeDisplayPark(name) {
    for (let i = 0; i < parks.length; i++) {
        if (parks[i].name == name) {
            selectedPark = parks[i].id
            document.getElementById("otoparkadi").innerText = parks[i].name
            document.getElementById("bospark").innerText = `Boş Park Sayısı: ${parks[i].emptyslots}`
            document.getElementById("ucret").innerText = `Saatlik ücret: ${parks[i].cost} ₺`
            break
        }
    }
}

document.getElementById("reserve-select-wrapper").addEventListener("click", (event) => {
    if (event.target.id == "reserve-select-wrapper") {
        closeReserved()
    }
})

function addReserved() {
    if (!selectedPark) return
    document.getElementById("reserve-select-wrapper").style.display = "flex"
}

function closeReserved() {
    document.getElementById("reserve-select-wrapper").style.display = "none"
}

function createReservation(vehicleid) {
    let date = new Date().getTime()
    console.log(date)
    $.post("/mobilotopark/createReservation.php", {vehicleid: vehicleid, parkid: selectedPark, time: date})
    alert("Rezervasyonunuz oluşturuldu.")
    location.reload()
}