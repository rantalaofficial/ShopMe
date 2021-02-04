const bodyParser = require("body-parser");

const express = require('express')
const app = express();
const port = 3000;

app.use(express.static('react/shopme/public'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, () => {
  	console.log(`App listening at http://localhost:${port}`)
});


app.get('/userdata/:token', (req, res) => {
	let data = dataManager.getData(req.params.token)
	res.sendFile(data);
});


/*
process.stdin.resume();
process.stdin.setEncoding('utf8');
process.stdin.on('data', function (text) {
	if (text.trim() === 'status') {
		console.log(`Open challenges: ${challenges.get().toString()}`);
	}
});
*/


