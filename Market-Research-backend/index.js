import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3001;

// Allow all origins (for development and production flexibility)
app.use(cors());
app.use(express.json());

// Replace with your Google Apps Script Web App URL
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxKvr-LW3MxPksCSsLHd86eBwx3Rk93YTgLJV_YMBSLPNs13HnU_evcFSXcWnOCa4Yy4A/exec';

app.post('/api/survey', async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });
    const text = await response.text();
    res.status(200).send(text);
  } catch (error) {
    res.status(500).json({ error: 'Failed to forward survey data', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Market Research Backend is running.');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
