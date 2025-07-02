# Market Research Backend

A minimal Node.js Express backend to forward survey data to Google Apps Script (Google Sheets).

## Setup

1. Install dependencies:
   ```sh
   npm install
   ```
2. Start the server:
   ```sh
   npm start
   ```
3. The backend will run on `http://localhost:3001` by default.

## Usage
- POST survey data to `http://localhost:3001/api/survey` from your React app.
- The backend will forward the data to your Google Apps Script web app.

## Configuration
- If you change your Google Apps Script URL, update the `GOOGLE_SCRIPT_URL` variable in `index.js`.
