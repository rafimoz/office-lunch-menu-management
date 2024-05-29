const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())

const db = mysql.createConnection({
  host: "Localhost",
  user: 'root',
  password: '',
  database: 'office_lunch_menu'
})


app.get('/', (re, res)=> {
  return res.json("From Backend");
})

app.get('/choices', (req, res)=> {
  const sql = "SELECT * FROM choices";
  db.query(sql, (err, data)=> {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.get('/view', (req, res) => {
  const { date } = req.query; // Get date from query parameters
  const sql = "SELECT * FROM choices WHERE date = ?";
  db.query(sql, [date], (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post('/saveChoice', (req, res) => {
  const { user_id, user_name, choice_id, choice_date } = req.body;
  const sql = "INSERT INTO user_choices (user_id, user_name, choice_id, choice_date) VALUES (?, ?, ?, ?)";
  db.query(sql, [user_id, user_name, choice_id, choice_date], (err, data) => {
      if (err) return res.json(err);
      return res.json("Choice Saved");
  });
});

app.get('/userChoices', (req, res) => {
  const sql = "SELECT * FROM user_choices";
  db.query(sql, (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
  });
});

app.post('/choices', (req, res)=> {
  const sql = "INSERT INTO choices (`id`,`employee_name`, `image`, `date`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.name,
    req.body.image,
    req.body.date
  ]
  
  db.query(sql, [values], (err, data)=> {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.get('/edit/:id', (req, res)=> {
  const sql = "SELECT * FROM choices Where id = ?";
  const id = req.params.id;
  db.query(sql,[id], (err, data)=> {
    if (err) return res.json(err);
    return res.json(data);
  })
})

app.put('/update/:id', (req, res) => {
  const sql = "UPDATE choices SET `employee_name` = ?, `image` = ? WHERE id = ?";
  const id = req.params.id;
  db.query(sql,[req.body.name,req.body.image, id], (err, data)=> {
    if (err) return res.json("Error");
    return res.json({updated: true});
  })
})

app.delete('/delete/:id', (req, res) => {
  const sql = "DELETE FROM choices WHERE id = ?";
  const id = req.params.id;
  db.query(sql,[id], (err, data)=> {
    if (err) return res.json("Error");
    return res.json(data);
  })
})

app.listen(8081, () => {
  console.log("Listening");
});