function openTab(evt, Name) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(Name).style.display = "block";
    evt.currentTarget.className += " active";
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();

function pendingRequest() {
    let url = 'http://localhost:7000/EmployeeRequestPending';
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let pends = JSON.parse(xhr.response);

            let pendingReq = document.getElementById('Pending Request');
            let new_table = document.createElement('table');
            let row = document.createElement('tr');
            let rname = document.createElement("th");
            let amount = document.createElement("th");
            let status = document.createElement("th");
            rname.innerText = "Request Name";
            amount.innerText = "Amount";
            status.innerText = "status";

            rname.id = "th";
            amount.id = "th";
            status.id = "th";

            new_table.appendChild(row);
            row.appendChild(rname);
            row.appendChild(amount);
            row.appendChild(status);
            pendingReq.appendChild(new_table);

            for (let pend of pends) {
                let pendingReq = document.getElementById('Pending Request');
                let new_table = document.createElement('table');
                let row = document.createElement('tr');
                let rname = document.createElement("th");
                let amount = document.createElement("th");
                let status = document.createElement("th");
                rname.innerText = pend.rName;
                amount.innerText = pend.amount.toFixed(2);
                status.innerText = pend.status;


                rname.id = "tr";
                amount.id = "tr";
                status.id = "tr";

                new_table.appendChild(row);
                row.appendChild(rname);
                row.appendChild(amount);
                row.appendChild(status);
                pendingReq.appendChild(new_table);
            }
        }
    }

    xhr.open('Get', url);
    xhr.send();
}

function historyRequest() {
    let url = 'http://localhost:7000/EmployeeRequestHistory';
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let pends = JSON.parse(xhr.response);

            let HistoryReq = document.getElementById('History');
            let new_table = document.createElement('table');
            let row = document.createElement('tr');
            let rname = document.createElement("th");
            let amount = document.createElement("th");
            let status = document.createElement("th");
            rname.innerText = "Request Name";
            amount.innerText = "Amount";
            status.innerText = "status";

            rname.id = "th";
            amount.id = "th";
            status.id = "th";

            new_table.appendChild(row);
            row.appendChild(rname);
            row.appendChild(amount);
            row.appendChild(status);
            HistoryReq.appendChild(new_table);


            for (let pend of pends) {
                let pendingReq = document.getElementById('History');
                let new_table = document.createElement('table');
                let row = document.createElement('tr');
                let rname = document.createElement("th");
                let amount = document.createElement("th");
                let status = document.createElement("th");
                rname.innerText = pend.rName;
                amount.innerText = "$ " + pend.amount.toFixed(2);
                status.innerText = pend.status;

                rname.id = "tr";
                amount.id = "tr";
                status.id = "tr";


                new_table.appendChild(row);
                row.appendChild(rname);
                row.appendChild(amount);
                row.appendChild(status);
                pendingReq.appendChild(new_table);

            }
        }
    }

    xhr.open('Get', url);
    xhr.send();
}

window.onload = function() {
    testSession();
    this.pendingRequest();
    this.historyRequest();

}