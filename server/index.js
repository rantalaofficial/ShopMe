/*depencies*/
require('dotenv').config()
const bodyParser = require("body-parser");
const path = require('path');
const express = require('express')

const ShoppingData = require('./shoppingData.js');
const sendIp = require('./sendIp.js');

const app = express();
const port = process.env.PORT;
const savingTimeout = 10000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
	sendIp();
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

const shoppingData = new ShoppingData("shoppingData.txt", savingTimeout);

app.get("/api/get_items", (req, res) => {
	res.json({ listedItems: shoppingData.getListedItems(), itemTypes: shoppingData.getItemTypes() });
});

app.get("/api/get_item_history", (req, res) => {
	res.json({ 
		itemHistory: shoppingData.getItemHistory(), 
		listsCreated: shoppingData.getListsCreated(), 
		firstListCreated: shoppingData.getFirstListCreated(),
		uptime: getUptime(),
	});
});

app.get("/api/get_uptime", (req, res) => {
	res.json(getUptime());
});

app.get("/api/set_checked/:type", (req, res) => {
	res.json(shoppingData.checkItem(req.params.type, true));
});

app.get("/api/set_unchecked/:type", (req, res) => {
	res.json(shoppingData.checkItem(req.params.type, false));
});

app.get("/api/delete_listed_items", (req, res) => {
	shoppingData.deleteListedItems();
	res.json(true);
});

app.get("/api/add_item/:type", (req, res) => {
	res.json(shoppingData.addItem(req.params.type));
});

//If any other request appears, just return the react app
app.get('*', (req, res) => {
	res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

function getUptime() {
	uptime = process.uptime();
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	let hours = Math.floor(uptime / (60 * 60));
	let minutes = Math.floor(uptime % (60 * 60) / 60);
	let seconds = Math.floor(uptime % 60);

	return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}


