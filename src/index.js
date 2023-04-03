const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const socket = require("socket.io");
const router = require("./api/routes/index");
const config = require("./config/database.config");
const crypto = require("crypto");
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config();

const http = require("http").createServer(app);
const io = new socket.Server(http, {
	cors: {
		origin: "*",
	},
});
io.on("connection", (socket) => {
	console.log(socket);
});
const fs = require("fs");
app.get("/end_end", (req, res) => {
	const publicKey = fs.readFileSync("./public_key.pem", (err) => {
		console.log(err);
	});
	return res.json({ publicKey: publicKey.toString() });
});
const PORT = process.env.PORT || 5000;
router(app);
config.mongoDB();
http.listen(PORT, () => {
	console.log(`Listening in PORT :${PORT}`);
});
