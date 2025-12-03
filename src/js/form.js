document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector("#loginForm");
    const emailInput = document.querySelector("#emailInput");
    const passwordInput = document.querySelector("#passwordInput");
    const btn = document.querySelector(".btn")

    btn.addEventListener("click", function (ev) {
        ev.preventDefault();

        if(emailInput.value ==="" || passwordInput.value ===""){
            alert("Wpisz dane!");
            return;
        }

        //Symulacja poprawnego logowania
        localStorage.setItem("token", "fake-token-123");
        //dodanie email do localStorage do powitania
        localStorage.setItem("email", emailInput.value);
        window.location.href="index.html";



        //Blokuje CORS!!!!
        // const email = emailInput.value;
        // const password = passwordInput.value;
        //
        // fetch("https://reqres.in/api/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         email: email,
        //         password: password
        //     })
        // })
        //     .then(res => {
        //         if (!res.ok) {
        //             throw new Error("Błędne dane logowania!");
        //         }
        //         return res.json();
        //     })
        //     .then(function(data) {
        //         console.log("Zalogowano! Token:", data.token);
        //         //window.location.href = "index.html";
        //     })
        //     .catch(err => {
        //         console.error(err.message);
        //     });
    });

})