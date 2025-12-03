document.addEventListener("DOMContentLoaded", function (){
    const inputTask = document.querySelector("#form1");

    const saveBTN = document.querySelector("#addBTN");
    //const deleteBTN = document.querySelector(".btn-danger");
    //const finishBTN = document.querySelector(".btn-success");

    const token = localStorage.getItem("token");

    if (!token){
        window.location.href = "login.html";
    }


    const tBody = document.querySelector("tbody")
    const tr = tBody.querySelector("tr");
    const tDs = tr.querySelectorAll("td");

    //delegatura zadan
    //zmiana statusu zadania oraz usuniecie
    tBody.addEventListener("click", function (ev){
        const clicked = ev.target;

        if(ev.target.classList.contains("btn-danger")){
            ev.target.closest("tr").remove();
        }

        if(ev.target.classList.contains("btn-success")){
            const tmp = ev.target.closest("tr");
            const changeStatus = tmp.children[2];
            changeStatus.textContent = "Finished";
        }

    })

    //zapisywanie nowego zadania
    saveBTN.addEventListener("click", function (ev){
        ev.preventDefault();
        const ctr = tBody.querySelectorAll("tr").length;

        const newTask = document.createElement("tr");
        newTask.innerHTML = `
        <th scope="row">${ctr +1}</th>
                                <td>${inputTask.value}</td>
                                <td>In progress</td>
                                <td>
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-danger">Delete</button>
                                    <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-success ms-1">Finished</button>
                                </td>
        `;

        tBody.appendChild(newTask);
    })

    const logOutBTN = document.querySelector("#logOutBTN");

    logOutBTN.addEventListener("click", ev=>{
        localStorage.removeItem("token");
        window.location.href = "login.html";
    })
    const greetingDiv = document.querySelector("#userGreeting");
    greetingDiv.textContent = `Witaj, ${localStorage.getItem("email")}`;
    //poprzednie podejscie
    // deleteBTN.addEventListener("click", function (ev){
    //     ev.preventDefault();
    //
    //     this.closest("tr").remove();
    // })


    //poprzednie podejscie z zdarzeniem na kazdy element rozpatrywany
    // finishBTN.addEventListener("click", function (ev) {
    //     ev.preventDefault();
    //
    //     const tmp = this.closest("tr");
    //     const changeStatus = tmp.querySelectorAll("td")[1];
    //     changeStatus.textContent = "Finished";
    // })

})