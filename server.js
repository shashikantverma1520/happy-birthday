const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = './wishes.json';

app.get('/wishes', (req, res) => {
  fs.readFile(DATA_FILE, (err, data) => {
    if (err) return res.status(500).send('Error reading wishes');
    res.send(JSON.parse(data));
  });
});

app.post('/wishes', (req, res) => {
  const { wish } = req.body;
  fs.readFile(DATA_FILE, (err, data) => {
    let wishes = JSON.parse(data);
    wishes.push({ wish });
    fs.writeFile(DATA_FILE, JSON.stringify(wishes), () => {
      res.send({ success: true });
    });
  });
});

app.listen(3000, () => console.log('🎂 Birthday server running on port 3000'));
