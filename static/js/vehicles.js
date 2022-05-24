function buildVehicleList() {
    let innerHTML = ""
    for (let i = 0; i < vehicles.length; i++) {
        innerHTML +=
        `<div class="vehicle-entry" id="v-${vehicles[i].id}">
            <div>${vehicles[i].plate}</div>
            <div>${vehicles[i].name}</div>
            <div class="vehicle-entry-delete" onclick="deleteVehicle(${vehicles[i].id})">KALDIR</div>
        </div>`
    }

    document.getElementById("vehicle-list").innerHTML = innerHTML
}

function addVehicle() {
    let plate = document.getElementById("vehicle-plate").value
    let name = document.getElementById("vehicle-name").value

    if (plate == "") {
        alert("Plaka alanı boş olamaz!")
        return
    }

    if (name == "") {
        alert("İsim alanı boş olamaz!")
        return
    }

    $.post("/mobilotopark/addVehicle.php", {plate: plate, name: name, email: user.email}, function(res) {
        console.log("res", res)
        if (res == "false") {
            alert("Bir sorun oluştu.")
        } else {
            let node = document.createElement("div")
            node.classList.add("vehicle-entry")
            node.id = "v-" + res
            node.innerHTML =
            `<div>${plate}</div>
            <div>${name}</div>
            <div class="vehicle-entry-delete" onclick="deleteVehicle(${res})">KALDIR</div>`
            document.getElementById("vehicle-list").append(node)

            document.getElementById("vehicle-name").value = ""
            document.getElementById("vehicle-plate").value = ""
        }
    })
}

buildVehicleList()