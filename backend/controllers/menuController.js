// controllers/menuController.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'office_lunch_menu'
});

connection.connect();

exports.addMenu = (req, res) => {
  const { date, options } = req.body;
  const optionsStr = JSON.stringify(options);
  connection.query('INSERT INTO menus (date, options) VALUES (?, ?)', [date, optionsStr], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: results.insertId, date, options });
  });
};

exports.viewMenu = (req, res) => {
  connection.query('SELECT * FROM menus WHERE date = CURDATE()', (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results.map(row => ({ ...row, options: JSON.parse(row.options) })));
  });
};