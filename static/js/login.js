function loginAttempt(event) {
    event.preventDefault()

    let email = document.getElementById("email")
    let pass = document.getElementById("pass")

    if (!email.value) {
        alert("E-mail alanının doldurmadınız.")
        return
    }

    if (!pass.value) {
        alert("Şifre alanının doldurmadınız.")
        return
    }

    $.post("/mobilotopark/loginAttempt.php", {email: email.value, password: pass.value}, function(res) {
        console.log("res")
        if (res == "true") {
            location.reload()
        } else {
            alert("Kullanıcı adı veya şifresi hatalı.")
        }
        
    })
}