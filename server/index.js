const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
	user: process.env.USER,
	host: process.env.HOST,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
});

app.post('/register', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		'INSERT INTO users (email, password) VALUES (?, ?)',
		[email, password],
		(err, result) => {
			if (err) {
				console.log(err);
				res.send({ message: false });
			} else {
				res.send({ message: true });
			}
			console.log(err);
		}
	);
});

app.post('/login', (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	db.query(
		'SELECt * FROM users WHERE email = ? and password = ?',
		[email, password],
		(err, result) => {
			if (err) {
				console.log(err);
				res.send({ err: err });
			} else {
				if (result.length > 0) {
					res.send({ message: true });
				} else {
					res.send({ message: 'Wrong username/combination' });
				}
			}
		}
	);
});

app.listen(port, () => {
	console.log(`listening on port ${port}`);
});
