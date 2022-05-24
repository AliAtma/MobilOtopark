var selectedReservation = false

function findVehicle(id) {
    for (let i = 0; i < vehicles.length; i++) {
        if (vehicles[i].id == id) {
            return vehicles[i]
        }
    }
    return false
}

function findPark(id) {
    for (let i = 0; i < parks.length; i++) {
        if (parks[i].id == id) {
            return parks[i]
        }
    }
    return false
}

function buildReservations() {
    let innerHTML = ""

    for (let i = 0; i < reservs.length; i++) {
        let vehicle = findVehicle(reservs[i].vehicleid)
        let park = findPark(reservs[i].parkid)
        let passedTime = Math.round((new Date().getTime() - reservs[i].date) / 3600000)
        let cost = passedTime * park.cost
        innerHTML +=
        `<div id="r-${reservs[i].id}" class="pay-reserv" onclick="selectReservation(${reservs[i].id})">
            <div class="pay-reserv-label">${vehicle.plate} - ${vehicle.name}</div>
            <div class="pay-reserv-park">${park.name}</div>
            <div class="pay-reserv-cost">${park.cost} ₺ / saat</div>
            <div class="pay-reserv-date">${reservs[i].date.dateString()}</div>
            <div class="pay-reserv-duration">${passedTime} saat</div>
            <div class="pay-reserv-total">${cost < park.cost ? park.cost : cost} ₺</div>
        </div>`
    }

    document.getElementById("pay-reserv-list").innerHTML = innerHTML
}

function selectReservation(id) {
    selectedReservation = id
    let oldselected = document.querySelector(".pay-reserv.selected")
    oldselected?.classList.remove("selected")
    let selected = document.getElementById("r-" + id)
    selected.classList.add("selected")
    document.getElementById("pay-total").innerText = "ÜCRET: " + selected.querySelector(".pay-reserv-total").innerText
}

function payReservation() {
    if (!selectedReservation) {
        alert("İlk önce rezervasyon seçmen lazım.")
        return
    }

    $.post("/mobilotopark/payReservation.php", {id: selectedReservation}, (res) => {
        console.log(res)
        if (res == "true") {
            alert("Ödeme başarılı.")
            location.reload()
        } else {
            alert("Yeteri kadar bakiyeniz yok, lütfen bakiye yükleyiniz.")
        }
    })
}

buildReservations()