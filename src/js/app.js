document.addEventListener("DOMContentLoaded", function (){
    const inputTask = document.querySelector("#form1");

    const saveBTN = document.querySelector("div .btn");
    const deleteBTN = document.querySelector(".btn-danger");
    const finishBTN = document.querySelector(".btn-success")


    const tBody = document.querySelector("tbody")
    const tr = tBody.querySelector("tr");
    const tDs = tr.querySelectorAll("td");

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

    deleteBTN.addEventListener("click", function (ev){
        ev.preventDefault();

        this.closest("tr").remove();
    })

    finishBTN.addEventListener("click", function (ev) {
        ev.preventDefault();

        const tmp = this.closest("tr");
        const changeStatus = tmp.querySelectorAll("td")[1];
        changeStatus.textContent = "Finished";
    })
})