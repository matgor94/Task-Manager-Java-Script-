document.addEventListener("DOMContentLoaded", function (){
    const inputTask = document.querySelector("#form1");
    const saveBTN = document.querySelector("#addBTN");
    const token = localStorage.getItem("token");

    const tBody = document.querySelector("tbody")
    tBody.innerHTML="";

    if (!token){
        window.location.href = "login.html";
    }


    //delegatura zadan
    //zmiana statusu zadania oraz usuniecie
    tBody.addEventListener("click", function (ev){
        const clicked = ev.target;

        if(ev.target.classList.contains("btn-danger")){
            const tr = ev.target.closest("tr");
            const id = tr.querySelector("th").textContent;

            fetch(`http://localhost:3000/tasks/${id}`, {
                method: "DELETE"
            })
                .then(() => {
                    tr.remove();
                    updateTaskNumbers();
                });
        }

        if(ev.target.classList.contains("btn-success")){
            const tmp = ev.target.closest("tr");
            const id = tmp.dataset.id;

            fetch(`http://localhost:3000/tasks/${id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({status: "Finished"})
            })
                .then(()=> {
                    tmp.children[2].textContent = "Finished";
                })
        }

    })

    //dodawanie zdania z api
    saveBTN.addEventListener("click", function (ev){
        ev.preventDefault();
        const title = inputTask.value;
        if(!title) return;

        fetch("http://localhost:3000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                status: "In progress",
                user: localStorage.getItem("email")
            })
        })
            .then(res=> res.json())
            .then(task =>{
                const newTask = document.createElement("tr");
                newTask.innerHTML = `
                <th scope="row">${task.id}</th>
                    <td>${task.title}</td>
                    <td>${task.status}</td>
                <td>
                    <button class="btn btn-danger">Delete</button>
                    <button class="btn btn-success ms-1">Finished</button>
                </td>
                `;
                tBody.appendChild(newTask);
                updateTaskNumbers();
            })



    })

    //wylogowywanie i powrot do formualrza logowania
    const logOutBTN = document.querySelector("#logOutBTN");
    logOutBTN.addEventListener("click", ev=>{
        localStorage.removeItem("token");
        window.location.href = "login.html";
    })

    //pozdrowienia zalogowanego uzytkownika
    const greetingDiv = document.querySelector("#userGreeting");
    greetingDiv.textContent = `Witaj, ${localStorage.getItem("email")}`;



    //update numerow zadan
    function updateTaskNumbers() {
        tBody.querySelectorAll("tr").forEach((tr, index) => {
            tr.querySelector("th").textContent = index + 1;
        });
    }


    //wyswietlanie danych i podlaczenie task menagera do api jsona lokalnego
    const email = localStorage.getItem("email");
    fetch(`http://localhost:3000/tasks?user=${email}`)
        .then(res=> res.json())
        .then(tasks =>{
            tasks.forEach((task, index) => {
                const newTask = document.createElement("tr");
                newTask.dataset.id = task.id;
                newTask.innerHTML =`
                    <th scope="row">${index + 1}</th>
                    <td>${task.title}</td>
                    <td>${task.status}</td>
                    <td>
                        <button class="btn btn-danger">Delete</button>
                        <button class="btn btn-success ms-1">Finished</button>
                    </td>
                    `;
            tBody.appendChild(newTask);
            updateTaskNumbers();
            })
        })

})


//poprzednie podejscie z zdarzeniem na kazdy element rozpatrywany
// finishBTN.addEventListener("click", function (ev) {
//     ev.preventDefault();
//
//     const tmp = this.closest("tr");
//     const changeStatus = tmp.querySelectorAll("td")[1];
//     changeStatus.textContent = "Finished";
// })


//poprzednie podejscie bez delegatury
// deleteBTN.addEventListener("click", function (ev){
//     ev.preventDefault();
//
//     this.closest("tr").remove();
// })

//zapisywanie nowego zadania bez api lokalnego
// saveBTN.addEventListener("click", function (ev){
//     ev.preventDefault();
//     const ctr = tBody.querySelectorAll("tr").length;
//
//     const newTask = document.createElement("tr");
//     newTask.innerHTML = `
//     <th scope="row">${ctr +1}</th>
//                             <td>${inputTask.value}</td>
//                             <td>In progress</td>
//                             <td>
//                                 <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-danger">Delete</button>
//                                 <button type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-success ms-1">Finished</button>
//                             </td>
//     `;
//
//     tBody.appendChild(newTask);
// })


