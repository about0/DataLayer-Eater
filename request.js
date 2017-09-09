//global: b
var DL = JSON.stingify(b);
var endpoint = 'http://95.158.2.12:7002'

var xhr = new XMLHttpRequest();

xhr.open('POST', endpoint, true)
xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')

xhr.send(DL);

if (xhr.status != 200) {
  console.log( xhr.status + ': ' + xhr.statusText ); 
} else {
  console.log( xhr.responseText ); 
}