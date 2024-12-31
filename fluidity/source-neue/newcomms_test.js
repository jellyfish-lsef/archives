const net = require("net");
const fs = require("fs")
const port = parseInt(fs.readFileSync("/Users/Shared/SW-PORT.txt"),"utf8")

const client = net.connect({ port }, function() {
	console.log("connected")
	client.write("H" + process.pid + "\0")
})
client.on("data", (d) => console.log(d.toString()))
