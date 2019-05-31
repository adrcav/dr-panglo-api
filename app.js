require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const AssistantV1 = require('watson-developer-cloud/assistant/v1');
const cors = require('cors');
const db = require('./mongo');

const messageController = require('./controllers/messages');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = process.env.PORT || 5000;

const assistant = new AssistantV1({
  username: process.env.ASSISTANT_USERNAME,
  password: process.env.ASSISTANT_PASSWORD,
  url: 'https://gateway.watsonplatform.net/assistant/api/',
  version: '2018-02-16'
});

db();

app.post('/conversation/', (req, res) => {
  const { text, context = {} } = req.body;

  const params = {
    input: { text },
    workspace_id: process.env.WORKSPACE_ID,
    context
  };

  assistant.message(params, (err, response) => {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(response);
    }
  });
});

app.post('/save', async (req, res) => {
  if (!req.body.text) {
    return res.status(200).json({});
  }

  try {
    const response = await messageController.addMessage(req.body);
    res.status(204).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.get('/saved', async (req, res) => {
  try {
    const response = await messageController.getAllMessages();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.delete('/saved', async (req, res) => {
  try {
    const response = await messageController.deleteAllMessages();
    res.status(200).json(response);
  } catch (err) {
    res.status(400).json(err);
  }
});

app.listen(port, () => console.log(`Running on port ${port}`));
