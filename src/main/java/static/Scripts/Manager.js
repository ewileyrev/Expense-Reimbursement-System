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


function managerPending() {
    let url = 'http://localhost:7000/ManagerRequestPending';
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let pends = JSON.parse(xhr.response);

            let HistoryReq = document.getElementById('Pending Request');
            let new_table = document.createElement('table');
            let row = document.createElement('tr');
            let Eid = document.createElement("th");
            let Ename = document.createElement("th");
            let rname = document.createElement("th");
            let amount = document.createElement("th");
            let status = document.createElement("th");
            Eid.innerText = "ID";
            Ename.innerText = "Name";
            rname.innerText = "Request Name";
            amount.innerText = "Amount";
            status.innerText = "Status";


            Eid.id = "tr";
            Ename.id = "tr";
            rname.id = "tr";
            amount.id = "tr";
            status.id = "tr";

            new_table.appendChild(row);
            row.appendChild(Eid);
            row.appendChild(Ename);
            row.appendChild(rname);
            row.appendChild(amount);
            row.appendChild(status);

            HistoryReq.appendChild(new_table);

            let i = 0;
            for (let pend of pends) {
                i = pend.requestid;
                let pendingReq = document.getElementById('Pending Request');
                let new_table = document.createElement('table');
                let row = document.createElement('tr');
                let Eid = document.createElement("th");
                let Ename = document.createElement("th");
                let rname = document.createElement("th");
                let amount = document.createElement("th");

                let status = document.createElement("th");
                let Approve = document.createElement('button');
                let Deny = document.createElement('button');

                Eid.innerText = pend.id;
                Ename.innerText = pend.name;
                rname.innerText = pend.rName;
                amount.innerText = pend.amount.toFixed(2);

                Approve.innerText = "Approve";
                Deny.innerText = "Deny";

                Eid.id = "tr";
                Ename.id = "tr";
                rname.id = "tr";
                amount.id = "tr";
                status.id = "tr";
                Approve.id = i;
                Deny.id = i;
                row.id = i;

                Approve.className = "Approve";
                Deny.className = "Deny";


                new_table.appendChild(row);
                row.appendChild(Eid);
                row.appendChild(Ename);
                row.appendChild(rname);
                row.appendChild(amount);
                row.appendChild(status);
                status.appendChild(Approve);
                status.appendChild(Deny);
                pendingReq.appendChild(new_table);
                i++;

                Approve.addEventListener("click", function() {
                    let requestChange = document.getElementById(this.id);

                    let json = {
                        id: requestChange.children[0].textContent,
                        name: requestChange.children[1].textContent,
                        rName: requestChange.children[2].textContent,
                        status: "Approve",
                        amount: requestChange.children[3].textContent,
                        requestid: this.id
                    };

                    update(json);

                });


                Deny.addEventListener("click", function() {
                    let requestChange = document.getElementById(this.id);

                    let json = {
                        id: requestChange.children[0].textContent,
                        name: requestChange.children[1].textContent,
                        rName: requestChange.children[2].textContent,
                        status: "Deny",
                        amount: requestChange.children[3].textContent,
                        requestid: this.id
                    };

                    update(json);

                });
            }
        }
    }
    xhr.open('Get', url);
    xhr.send();
}

function managerHistory() {
    let url = 'http://localhost:7000/ManagerRequestHistory';
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let pends = JSON.parse(xhr.response);

            let HistoryReq = document.getElementById('History');
            let new_table = document.createElement('table');
            let row = document.createElement('tr');
            let Eid = document.createElement("th");
            let Ename = document.createElement("th");
            let rname = document.createElement("th");
            let amount = document.createElement("th");
            let status = document.createElement("th");
            Eid.innerText = "ID";
            Ename.innerText = "Name";
            rname.innerText = "Request Name";
            amount.innerText = "Amount";
            status.innerText = "Status";

            Eid.id = "tr";
            Ename.id = "tr";
            rname.id = "tr";
            amount.id = "tr";
            status.id = "tr";

            new_table.appendChild(row);
            row.appendChild(Eid);
            row.appendChild(Ename);
            row.appendChild(rname);
            row.appendChild(amount);
            row.appendChild(status);
            HistoryReq.appendChild(new_table);


            for (let pend of pends) {
                let pendingReq = document.getElementById('History');
                let new_table = document.createElement('table');
                let row = document.createElement('tr');
                let Eid = document.createElement("th");
                let Ename = document.createElement("th");
                let rname = document.createElement("th");
                let amount = document.createElement("th");
                let status = document.createElement("th");
                Eid.innerText = pend.id;
                Ename.innerText = pend.name;
                rname.innerText = pend.rName;
                amount.innerText = "$" + pend.amount.toFixed(2);
                status.innerText = pend.status;

                Eid.id = "tr";
                Ename.id = "tr";
                rname.id = "tr";
                amount.id = "tr";
                status.id = "tr";


                new_table.appendChild(row);
                row.appendChild(Eid);
                row.appendChild(Ename);
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

function stat() {
    let url = 'http://localhost:7000/Stat';
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let stat = JSON.parse(xhr.response);

            let hSpender = document.getElementById('hSpender');
            hSpender.innerText = stat.highestSpender;

            let hAmount = document.getElementById('hRequest');
            hAmount.innerText = "$ " + stat.highestamount.toFixed(2);

            let total = document.getElementById('total')
            total.innerText = "$ " + stat.total.toFixed(2);

        }
    }
    xhr.open('Get', url);
    xhr.send();

}

function update(json) {
    console.log(json);
    let send = JSON.stringify(json);
    console.log(send);
    let url = 'http://localhost:7000/update';
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader("Content-Type", "application/json")
    xhr.send(send);
    window.open("http://localhost:7000/Manager.html", "Manager System");
}



window.onload = function() {
    testSession();
    this.managerPending();
    this.managerHistory();
    this.stat();
}