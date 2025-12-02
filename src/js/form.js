document.addEventListener("DOMContentLoaded", function (){
    const form = document.querySelector("#loginForm");
    const email = document.querySelector("#emailInput");
    const password = document.querySelector("#passwordInput");
    const btn = document.querySelector(".btn")
    console.log(btn);


    btn.addEventListener("click", function (ev){
        ev.preventDefault();

        console.log(email.value);
        console.log(password.value);
    })
})