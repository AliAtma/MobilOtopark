Number.prototype.dateString = function() {
    let date = new Date(this)
    let day = date.getDate()
    let month = date.getMonth() + 1
    let hours = date.getHours()
    let mins = date.getMinutes()
    day = day < 10 ? "0" + day : day
    month = month < 10 ? "0" + month : month
    hours = hours < 10 ? "0" + hours : hours
    mins = mins < 10 ? "0" + mins : mins
    return (day + "/" + month + "/" + date.getFullYear() + " - " + hours + ":" + mins)
}

function prepareShell() {
    document.getElementById("main-wrap").innerHTML =
    `<div id="sidebar" onmouseover="showNavbar()" onmouseout="hideNavbar()">
        <ul class="nav_list">
            <li>
                <div class="sidebar-entry" onclick="window.location='/mobilotopark/index.php'">
                    <i class='bx bx-home' ></i>
                    <span class="links_name">Ana Sayfa</span>
                </div>
                <span class="tooltip">Ana Sayfa</span>
            </li>
            <li>
                <div class="sidebar-entry" onclick="window.location='/mobilotopark/vehicles.php'">
                    <i class='bx bx-car'></i>
                    <span class="links_name">Kayıtlı Araçlar</span>
                </div>
                <span class="tooltip">Kayıtlı Araçlar</span>
            </li>
            <li>
                <div class="sidebar-entry" onclick="window.location='/mobilotopark/pay.php'">
                    <i class='bx bx-detail'></i>
                    <span class="links_name">Ödeme</span>
                </div>
                <span class="tooltip">Ödeme</span>
            </li>
            <li>
                <div class="sidebar-entry" onclick="window.location='/mobilotopark/payment.php'">
                    <i class='bx bx-credit-card'></i>
                    <span class="links_name">Bakiye ve Kartlar</span>
                </div>
                <span class="tooltip">Bakiye ve Kartlar</span>
            </li>
            <li>
                <div class="sidebar-entry" onclick="exitPage()">
                    <i class='bx bx-exit'></i>
                    <span class="links_name">Çıkış</a></span>
                </div>
                <span class="tooltip">Çıkış</span>
            </li>
        </ul>
    </div>
    <div id="inner-content"></div>
    <nav class="nav">
        <div class="logo_content">
            <div class="logo">
                <i class='bx bx-car'></i>
                <div class="logo_name">Mobil Otopark</div>
            </div>
        </div>
        <div class="profile_details">
            <div id="bakiye">Bakiye: ${user.balance} ₺</div>
            <div class="nameimg">
                <img src="${user.avatar}" alt="">
                <div class="name">${user.name}</div>
            </div>
        </div>
    </nav>`
}

function loadHTMLFile(uri) {
    console.log("uri", uri)
    return new Promise((res) =>  {
        let xml = new XMLHttpRequest()
        xml.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status === 200) {
                    res(this.responseText)
                } else {
                    res("<h1>Bir hata oldu amk.</h1>")
                }
            }
        }
        xml.open("GET", "static/html/" + uri + "?" + new Date().getTime(), true)
        xml.send()
    })
}

function gotoPage(page) {
    let loading = document.createElement("div")
    loading.id = "loading"
    loading.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin:auto;display:block;" width="214px" height="214px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
    <circle cx="50" cy="50" fill="none" stroke="#ffffff" stroke-width="1" r="25" stroke-dasharray="117.80972450961724 41.269908169872416">
      <animateTransform attributeName="transform" type="rotate" repeatCount="indefinite" dur="0.4545454545454546s" values="0 50 50;360 50 50" keyTimes="0;1"></animateTransform>
    </circle>
    </svg>`
    document.getElementById("inner-content").append(loading)

    setTimeout(async () => {
        document.getElementById("inner-content").innerHTML = await loadHTMLFile(page)
        formatPage(page)
    }, 1000)
}

function formatPage(page) {
    if (page == "homepage.html") {
        document.getElementById("otoparkadi").innerText = parks[0].name
        document.getElementById("bospark").innerText = `Boş Park Sayısı: ${parks[0].emptyslots}`
        document.getElementById("ucret").innerText = `Saatlik ücret: ${parks[0].cost} ₺`

        let script1 = document.createElement("script")
        script1.setAttribute("async", "true")
        script1.setAttribute("defer", "true")
        script1.src = "https://maps.googleapis.com/maps/api/js?key=AIzaSyDjUC14Mny2eIEq0yopw9-BP7aFoFlDLHE&callback=initMap"

        let script2 = document.createElement("script")
        script2.src = "static/js/parks.js?" + new Date().getTime()

        document.body.append(script2)
        document.body.append(script1)
    } else if (page == "vehicles.html") {
        let script1 = document.createElement("script")
        script1.src = "static/js/vehicles.js?" + new Date().getTime()
        document.body.append(script1)
    } else if (page == "payment.html") {
        let script1 = document.createElement("script")
        script1.src = "static/js/payment.js?" + new Date().getTime()
        document.body.append(script1)
    } else if (page == "pay.html") {
        let script1 = document.createElement("script")
        script1.src = "static/js/pay.js?" + new Date().getTime()
        document.body.append(script1)
    }
}

function showNavbar() {
    sidebar.classList.add("active")
}

function hideNavbar() {
    sidebar.classList.remove("active")
}

function exitPage() {
    $.post("/mobilotopark/logout.php")
    location.reload()
}

prepareShell()