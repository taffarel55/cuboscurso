var http = require('http');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  var osCara = ["Breno", "Geraldo", "Mauricio"];
  res.write("<h1>Exibindo os caras</h1>");
  res.write("<ul>");
  osCara.forEach(exibirOsCara);
  res.write("</ul>");
  res.end();

  function exibirOsCara(item, index) {res.write(`<li>Cara ${index+1}: ${item}</li>`);} 

}).listen(8080); 