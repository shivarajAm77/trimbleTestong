//app.js

var http = require('http');
var fs = require('fs'); // to get data from html file

http.createServer(function (req, res) {
    var url = req.url;
    if (url === "/") {
        fs.readFile("head.html", function (err, pgres) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("HEAD.HTML NOT FOUND");
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgres);
                res.end();
            }
        });
    } else if (url === "/tailPage") {
        fs.readFile("tail.html", function (err, pgres) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("TAIL.HTML NOT FOUND");
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgres);
                res.end();
            }
        });
    } else if (url === "/index.html") {
        fs.readFile("static/index.html", function (err, pgres) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("INDEX.HTML NOT FOUND");
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(pgres);
                res.end();
            }
        });
    } else if (url === "/extension.json") {
        fs.readFile("static/extension.json", function (err, pgres) {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.write("EXTENSION.JSON NOT FOUND");
                res.end();
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.write(pgres);
                res.end();
            }
        });
    } else if (url === "/V.png") {
        fs.readFile("V.png", function (err, pgres) {
              if (err) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.write("V.PNG NOT FOUND");
            res.end();
        } else {
            res.writeHead(200, { "Content-Type": "image/png" });
            res.write(pgres);
            res.end();
        }
        });
    }

    const path = require("path");

    if (url.startsWith("/static/")) {
        const filePath = path.join(__dirname, url);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("STATIC FILE NOT FOUND");
                return;
            }

            // Set correct Content-Type
            if (url.endsWith(".css")) {
                res.writeHead(200, { "Content-Type": "text/css" });
            } else if (url.endsWith(".js")) {
                res.writeHead(200, { "Content-Type": "application/javascript" });
            } else if (url.endsWith(".html")) {
                res.writeHead(200, { "Content-Type": "text/html" });
            }

            res.end(data);
        });

        return; // stop further routing
    }

}).listen(3000, function () {
    console.log("SERVER STARTED PORT: 3000");
});
