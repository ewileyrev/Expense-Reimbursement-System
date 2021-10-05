function testSession() {
    let url = "http://localhost:7000/test";
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            let testSession = JSON.parse(xhr.response);
            if (testSession.type === 'false') {

                window.location.replace("http://localhost:7000/Login.html");
            }
        }
    }

    xhr.open('Get', url);
    xhr.send();
}