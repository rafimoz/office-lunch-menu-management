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

app.post('/choices', (req, res)=> {
  const sql = "INSERT INTO choices (`id`,`employee_name`, `image`) VALUES (?)";
  const values = [
    req.body.id,
    req.body.name,
    req.body.image
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
  const sql = "UPDATE choices SET `employee_name` = ? Where id = ?";
  const id = req.params.id;
  db.query(sql,[req.body.name, id], (err, data)=> {
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