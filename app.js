$('button').text(document.documentMode);

var xhr = new XMLHttpRequest();
xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function() {
    if (xhr.status === 200) {
        var userInfo = JSON.parse(xhr.responseText);
        console.log(userInfo);
    }
};
xhr.send(JSON.stringify({
    name: 'John Smith',
    age: 34
}));


axios('https://jsonplaceholder.typicode.com/todos/', { headers: { authorization: 'bearer ADDDSDIDJDNsdl434j' } }).then(function(res) {
    console.log(res);
});
axios('https://jsonplaceholder.typicode.com/todos/2').then(function(res) {
    console.log(res);
});

$(document).ready(function() {
    var dashboardPowerBiApi = new PowerBIAPP(null, 'true');
    dashboardPowerBiApi.embedPowerBIApi();
});