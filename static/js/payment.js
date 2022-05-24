let selectedCard = false

function buildCards() {
    let cardlist = ""

    for (let i = 0; i < cards.length; i++) {
        cardlist +=
        `<div class="card-entry" id="c-${cards[i].id}">
            <div><span>Kart Adı: </span>${cards[i].name}</div>
            <div><span>Kart Sahibi: </span>${cards[i].owner}</div>
            <div><span>Kart Numarası: </span>${cards[i].number}</div>
            <div><span>Son Kullanma Tarihi: </span>${cards[i].expiredate}</div>
            <div><span>Güvenlik Numarası: </span>${cards[i].cvv}</div>
            <div class="card-entry-select" onclick="selectCard(${cards[i].id})">SEC</div>
            <div class="card-entry-delete" onclick="deleteCard(${cards[i].id})">KALDIR</div>
        </div>`
    }

    let area = document.getElementById("card-list")
    area.innerHTML = cardlist + area.innerHTML
}

function openCardTab() {
    document.getElementById("card-create-wrap").style.display = "flex"
}

function closeCardTab() {
    document.getElementById("card-create-wrap").style.display = "none"
}

function selectCard(id) {
    let oldselected = document.querySelector(".card-entry.selected")
    oldselected?.classList.remove("selected")
    document.getElementById("c-" + id).classList.add("selected")
    selectedCard = id
}

function addCard(event) {
    event.preventDefault()
    let name = document.querySelector("input[name='name']")
    let owner = document.querySelector("input[name='owner']")
    let number = document.querySelector("input[name='number']")
    let cvv = document.querySelector("input[name='cvv']")
    let expiredate = document.querySelector("input[name='expiredate']")

    if (name.value == "" || owner.value == "" || number.value == "" || cvv.value == "" || expiredate.value == "") {
        alert("Lütfen tüm alanları doldurunu.")
        return
    }

    if (isNaN(Number(number.value)) || isNaN(Number(cvv.value))) {
        alert("Kart numavarsı ve cvv numarası hatalı.")
        return
    }

    $.post("/mobilotopark/addCard.php", {name: name.value, owner: owner.value, number: Number(number.value), cvv: Number(cvv.value), expiredate: expiredate.value})
    alert("Kart eklendi.")
    location.reload()
}

function deleteCard(id) {
    $.post("/mobilotopark/deleteCard.php", {id: id})
    document.getElementById("c-" + id).remove()
    alert("Kart silindi.")
}

function addBalance() {
    if (!selectedCard) {
        alert("İlk önce ödeme yapacağınız kartı seçmeniz lazım.")
        return
    }
    let amount = document.getElementById("add-balance").value

    if (amount == "" || isNaN(Number(amount))) {
        alert("Lütfen geçerli bir miktar giriniz.")
        return
    }
    amount = Number(amount)
    $.post("/mobilotopark/addBalance.php", {amount: amount})
    user.balance += amount
    document.getElementById("bakiye").innerText = `Bakiye: ${user.balance} ₺`
    document.getElementById("added-amount").style.display = "flex"
    document.getElementById("added-amount").innerText = `${amount} ₺ eklendi`
    alert("Bakiye yüklendi.")
}

buildCards()