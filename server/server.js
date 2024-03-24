// server.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Contact = require('./models/Contact'); // Import the Contact model

const app = express();
app.use(express.json());
app.use(cors());

const PORT =  8080;

// Connect to MongoDB
mongoose.connect('mongodb+srv://nehashetty:Mongodb@cluster0.wfi6caw.mongodb.net/contacts', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected...');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define routes

// Route to add a new contact
app.post('/contact', async (req, res) => {
  try {
    console.log('hi');
    const { name, email, contactNumber, subject } = req.body;
    const newContact = new Contact({ name, email, contactNumber, subject });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to add contact' });
  }
});

// Route to get all contacts
app.get('/api/contacts', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
