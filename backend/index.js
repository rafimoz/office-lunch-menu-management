const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://rafimozumder:admin@cluster0.zhqnq.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

// Define Mongoose Schemas
const choiceSchema = new mongoose.Schema({
  id: Number,
  employee_name: String,
  image: String,
  date: String
});

const userChoiceSchema = new mongoose.Schema({
  user_id: Number,
  user_name: String,
  choice_id: Number,
  choice_date: String
});

// Create Models
const Choice = mongoose.model('Choice', choiceSchema);
const UserChoice = mongoose.model('UserChoice', userChoiceSchema);

// Routes
app.get('/', (req, res) => {
  return res.json("From Backend");
});

// Get all choices
app.get('/choices', async (req, res) => {
  try {
    const choices = await Choice.find();
    res.json(choices);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get choices by date
app.get('/view', async (req, res) => {
  try {
    const { date } = req.query;
    const choices = await Choice.find({ date });
    res.json(choices);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save user choice
app.post('/saveChoice', async (req, res) => {
  try {
    const { user_id, user_name, choice_id, choice_date } = req.body;
    const newUserChoice = new UserChoice({ user_id, user_name, choice_id, choice_date });
    await newUserChoice.save();
    res.json("Choice Saved");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all user choices
app.get('/userChoices', async (req, res) => {
  try {
    const userChoices = await UserChoice.find();
    res.json(userChoices);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Add a new choice
app.post('/choices', async (req, res) => {
  try {
    const { id, name, image, date } = req.body;
    const newChoice = new Choice({ id, employee_name: name, image, date });
    await newChoice.save();
    res.json("Choice Added");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a specific choice by ID
app.get('/edit/:id', async (req, res) => {
  try {
    const choice = await Choice.findOne({ id: req.params.id });
    res.json(choice);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a choice
app.put('/update/:id', async (req, res) => {
  try {
    const { name, image } = req.body;
    await Choice.findOneAndUpdate(
      { id: req.params.id },
      { employee_name: name, image },
      { new: true }
    );
    res.json({ updated: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a choice
app.delete('/delete/:id', async (req, res) => {
  try {
    await Choice.findOneAndDelete({ id: req.params.id });
    res.json("Deleted Successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

app.listen(8081, () => {
  console.log("Listening on port 8081");
});