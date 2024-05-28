// controllers/choiceController.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'office_lunch_menu'
});

connection.connect();

exports.selectChoice = (req, res) => {
  const { employee_name, menu_id, choice } = req.body;
  connection.query('INSERT INTO choices (employee_name, menu_id, choice) VALUES (?, ?, ?)', [employee_name, menu_id, choice], (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json({ id: results.insertId, employee_name, menu_id, choice });
  });
};

exports.viewChoices = (req, res) => {
  connection.query('SELECT * FROM choices', (error, results) => {
    if (error) return res.status(500).json({ error: error.message });
    res.json(results);
  });
};