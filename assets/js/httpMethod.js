
var serverPort = 'http://localhost:8080';

var myHeaders = 
    {
        "Content-Type": "application/json", 
        "Authorization": `${getCookie("Authorization")}`,
        "Credentials": "include",         
    };

var getAuth = {
    method: 'GET',
    headers: myHeaders,
}

function postAuth(data) {
    return  options = {
              method: 'POST',
              headers: myHeaders, 
              body: JSON.stringify(data)
            }
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}